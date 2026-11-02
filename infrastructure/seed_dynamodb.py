import os
import json
from decimal import Decimal
import boto3
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", "backend", ".env"))

AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "")
TABLE_PREFIX = os.getenv("DYNAMODB_TABLE_PREFIX", "portfolio_")

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "backend", "data")

def convert_floats(obj):
    if isinstance(obj, float):
        return Decimal(str(obj))
    elif isinstance(obj, dict):
        return {k: convert_floats(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_floats(v) for v in obj]
    return obj

def main():
    session = boto3.Session(
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=AWS_REGION,
    )
    dynamodb = session.resource("dynamodb")

    mappings = [
        ("profile.json", "portfolio_profile"),
        ("projects.json", "portfolio_projects"),
        ("skills.json", "portfolio_skills"),
        ("experience.json", "portfolio_experience"),
        ("certifications.json", "portfolio_certifications"),
        ("achievements.json", "portfolio_achievements"),
    ]

    for file_name, table_name in mappings:
        file_path = os.path.join(DATA_DIR, file_name)
        if not os.path.exists(file_path):
            continue
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        table = dynamodb.Table(table_name)
        items = data if isinstance(data, list) else [data]
        count = 0
        with table.batch_writer() as batch:
            for item in items:
                batch.put_item(Item=convert_floats(item))
                count += 1
        print(f"  ✅ Seeded {count} items into {table_name}")

    print("\n🎉 DynamoDB seeding complete!")

if __name__ == "__main__":
    main()
