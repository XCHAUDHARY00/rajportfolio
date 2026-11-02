import json
import logging
import os
from pathlib import Path
import boto3
from botocore.exceptions import BotoCoreError, ClientError
from fastapi import HTTPException
from app.config import settings

logger = logging.getLogger(__name__)

_dynamodb_resource = None

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)


def is_aws_configured() -> bool:
    """Return True if AWS credentials are provided and not dummy values."""
    return bool(
        settings.AWS_ACCESS_KEY_ID
        and settings.AWS_SECRET_ACCESS_KEY
        and settings.AWS_ACCESS_KEY_ID != "your_key"
    )


def _get_local_file(table_name: str) -> Path:
    return DATA_DIR / f"{table_name}.json"


def _read_local_data(table_name: str) -> list[dict]:
    path = _get_local_file(table_name)
    if not path.exists():
        return []
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.warning("Error reading local table %s: %s", table_name, e)
        return []


def _write_local_data(table_name: str, items: list[dict]):
    path = _get_local_file(table_name)
    try:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(items, f, indent=2, default=str)
    except Exception as e:
        logger.error("Error writing local table %s: %s", table_name, e)


def _get_resource():
    global _dynamodb_resource
    if _dynamodb_resource is None:
        kwargs = {"region_name": settings.AWS_REGION}
        if settings.AWS_ACCESS_KEY_ID and settings.AWS_SECRET_ACCESS_KEY:
            kwargs["aws_access_key_id"] = settings.AWS_ACCESS_KEY_ID
            kwargs["aws_secret_access_key"] = settings.AWS_SECRET_ACCESS_KEY
        _dynamodb_resource = boto3.resource("dynamodb", **kwargs)
    return _dynamodb_resource


def _table(table_name: str):
    full_name = settings.DYNAMODB_TABLE_PREFIX + table_name
    return _get_resource().Table(full_name)


def get_item(table_name: str, key: dict) -> dict | None:
    """Fetch a single item by primary key."""
    if not is_aws_configured():
        items = _read_local_data(table_name)
        for it in items:
            if all(it.get(k) == v for k, v in key.items()):
                return it
        return None

    try:
        response = _table(table_name).get_item(Key=key)
        return response.get("Item")
    except (ClientError, BotoCoreError) as e:
        logger.warning("DynamoDB get_item error, using local fallback: %s", e)
        items = _read_local_data(table_name)
        for it in items:
            if all(it.get(k) == v for k, v in key.items()):
                return it
        return None


def put_item(table_name: str, item: dict) -> dict:
    """Put (create/replace) an item."""
    if not is_aws_configured():
        items = _read_local_data(table_name)
        pk_keys = ["id", "pk"]
        idx = -1
        for i, existing in enumerate(items):
            for pk in pk_keys:
                if pk in item and pk in existing and item[pk] == existing[pk]:
                    idx = i
                    break
            if idx != -1:
                break
        if idx >= 0:
            items[idx] = item
        else:
            items.append(item)
        _write_local_data(table_name, items)
        return item

    try:
        _table(table_name).put_item(Item=item)
        return item
    except (ClientError, BotoCoreError) as e:
        logger.warning("DynamoDB put_item error, using local fallback: %s", e)
        items = _read_local_data(table_name)
        items = [i for i in items if not (("id" in item and i.get("id") == item["id"]) or ("pk" in item and i.get("pk") == item["pk"]))]
        items.append(item)
        _write_local_data(table_name, items)
        return item


def update_item(table_name: str, key: dict, updates: dict) -> dict:
    """Update only supplied fields."""
    if not updates:
        return get_item(table_name, key) or {}

    if not is_aws_configured():
        items = _read_local_data(table_name)
        target = None
        for it in items:
            if all(it.get(k) == v for k, v in key.items()):
                target = it
                break
        if target is None:
            target = {**key, **updates}
            items.append(target)
        else:
            target.update(updates)
        _write_local_data(table_name, items)
        return target

    try:
        expr_parts = []
        expr_names: dict = {}
        expr_values: dict = {}
        for i, (k, v) in enumerate(updates.items()):
            placeholder = f"#f{i}"
            value_key = f":v{i}"
            expr_parts.append(f"{placeholder} = {value_key}")
            expr_names[placeholder] = k
            expr_values[value_key] = v

        update_expression = "SET " + ", ".join(expr_parts)
        response = _table(table_name).update_item(
            Key=key,
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expr_names,
            ExpressionAttributeValues=expr_values,
            ReturnValues="ALL_NEW",
        )
        return response.get("Attributes", {})
    except (ClientError, BotoCoreError) as e:
        logger.warning("DynamoDB update_item error, using local fallback: %s", e)
        items = _read_local_data(table_name)
        target = None
        for it in items:
            if all(it.get(k) == v for k, v in key.items()):
                target = it
                break
        if target is None:
            target = {**key, **updates}
            items.append(target)
        else:
            target.update(updates)
        _write_local_data(table_name, items)
        return target


def delete_item(table_name: str, key: dict) -> None:
    """Delete an item by primary key."""
    if not is_aws_configured():
        items = _read_local_data(table_name)
        items = [it for it in items if not all(it.get(k) == v for k, v in key.items())]
        _write_local_data(table_name, items)
        return

    try:
        _table(table_name).delete_item(Key=key)
    except (ClientError, BotoCoreError) as e:
        logger.warning("DynamoDB delete_item error, using local fallback: %s", e)
        items = _read_local_data(table_name)
        items = [it for it in items if not all(it.get(k) == v for k, v in key.items())]
        _write_local_data(table_name, items)


def scan_table(table_name: str) -> list[dict]:
    """Full table scan."""
    if not is_aws_configured():
        return _read_local_data(table_name)

    try:
        table = _table(table_name)
        items: list = []
        response = table.scan()
        items.extend(response.get("Items", []))
        while "LastEvaluatedKey" in response:
            response = table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
            items.extend(response.get("Items", []))
        return items
    except (ClientError, BotoCoreError) as e:
        logger.warning("DynamoDB scan error, using local fallback: %s", e)
        return _read_local_data(table_name)


def query_table(
    table_name: str,
    key_condition_expression,
    expression_attribute_values: dict,
    expression_attribute_names: dict | None = None,
    index_name: str | None = None,
) -> list[dict]:
    """Query items by key condition."""
    if not is_aws_configured():
        return _read_local_data(table_name)

    try:
        kwargs: dict = {
            "KeyConditionExpression": key_condition_expression,
            "ExpressionAttributeValues": expression_attribute_values,
        }
        if expression_attribute_names:
            kwargs["ExpressionAttributeNames"] = expression_attribute_names
        if index_name:
            kwargs["IndexName"] = index_name

        table = _table(table_name)
        items: list = []
        response = table.query(**kwargs)
        items.extend(response.get("Items", []))
        while "LastEvaluatedKey" in response:
            kwargs["ExclusiveStartKey"] = response["LastEvaluatedKey"]
            response = table.query(**kwargs)
            items.extend(response.get("Items", []))
        return items
    except (ClientError, BotoCoreError) as e:
        logger.warning("DynamoDB query error, using local fallback: %s", e)
        return _read_local_data(table_name)
