"""
infrastructure/dynamodb_setup.py
Creates all 6 DynamoDB tables required by the portfolio backend.
Run once per environment:
    python3 infrastructure/dynamodb_setup.py
"""
import os
import sys
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", "backend", ".env"))

AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "")
TABLE_PREFIX = os.getenv("DYNAMODB_TABLE_PREFIX", "portfolio_")

# Table definitions: (logical_name, partition_key_name, partition_key_type)
TABLES = [
    ("profile",        "pk",  "S"),
    ("projects",       "id",  "S"),
    ("skills",         "id",  "S"),
    ("experience",     "id",  "S"),
    ("certifications", "id",  "S"),
    ("achievements",   "id",  "S"),
]


def get_client():
    kwargs = {"region_name": AWS_REGION}
    if AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY:
        kwargs["aws_access_key_id"] = AWS_ACCESS_KEY_ID
        kwargs["aws_secret_access_key"] = AWS_SECRET_ACCESS_KEY
    return boto3.client("dynamodb", **kwargs)


def create_table(client, logical_name: str, pk_name: str, pk_type: str):
    full_name = TABLE_PREFIX + logical_name
    try:
        client.create_table(
            TableName=full_name,
            AttributeDefinitions=[
                {"AttributeName": pk_name, "AttributeType": pk_type}
            ],
            KeySchema=[
                {"AttributeName": pk_name, "KeyType": "HASH"}
            ],
            BillingMode="PAY_PER_REQUEST",
        )
        print(f"  ✅  Created table: {full_name}")
    except ClientError as e:
        if e.response["Error"]["Code"] == "ResourceInUseException":
            print(f"  ⏭   Table already exists (skipping): {full_name}")
        else:
            print(f"  ❌  Error creating {full_name}: {e}", file=sys.stderr)
            raise


def wait_for_tables(client):
    waiter = client.get_waiter("table_exists")
    for logical_name, _, _ in TABLES:
        full_name = TABLE_PREFIX + logical_name
        print(f"  ⏳  Waiting for {full_name} to become ACTIVE …")
        waiter.wait(TableName=full_name, WaiterConfig={"Delay": 3, "MaxAttempts": 20})
        print(f"  ✔   {full_name} is ACTIVE")


def main():
    print(f"\n{'='*55}")
    print(f"  DynamoDB Table Setup  (region: {AWS_REGION})")
    print(f"{'='*55}\n")
    client = get_client()

    print("Creating tables …")
    for logical_name, pk_name, pk_type in TABLES:
        create_table(client, logical_name, pk_name, pk_type)

    print("\nWaiting for tables to become ACTIVE …")
    wait_for_tables(client)

    print(f"\n🎉  All {len(TABLES)} tables are ready!\n")


if __name__ == "__main__":
    main()
