"""
infrastructure/s3_setup.py
Creates the S3 bucket used by the portfolio backend and configures:
  - Public-read access for static assets
  - CORS for frontend access
  - Folder structure placeholders (profile/, projects/, certifications/,
    experience/, resume/)

Run once per environment:
    python3 infrastructure/s3_setup.py
"""
import json
import os
import sys
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", "backend", ".env"))

AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "")
BUCKET_NAME = os.getenv("S3_BUCKET_NAME", "raj-portfolio-assets")

FOLDERS = ["profile/", "projects/", "certifications/", "experience/", "resume/"]

CORS_CONFIG = {
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
            "AllowedOrigins": ["*"],  # Tighten to your domain in production
            "ExposeHeaders": ["ETag"],
            "MaxAgeSeconds": 3600,
        }
    ]
}

PUBLIC_READ_POLICY = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": f"arn:aws:s3:::{BUCKET_NAME}/*",
        }
    ],
}


def get_client():
    kwargs = {"region_name": AWS_REGION}
    if AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY:
        kwargs["aws_access_key_id"] = AWS_ACCESS_KEY_ID
        kwargs["aws_secret_access_key"] = AWS_SECRET_ACCESS_KEY
    return boto3.client("s3", **kwargs)


def create_bucket(client):
    try:
        if AWS_REGION == "us-east-1":
            client.create_bucket(Bucket=BUCKET_NAME)
        else:
            client.create_bucket(
                Bucket=BUCKET_NAME,
                CreateBucketConfiguration={"LocationConstraint": AWS_REGION},
            )
        print(f"  ✅  Bucket created: {BUCKET_NAME}")
    except ClientError as e:
        code = e.response["Error"]["Code"]
        if code in ("BucketAlreadyOwnedByYou", "BucketAlreadyExists"):
            print(f"  ⏭   Bucket already exists (skipping): {BUCKET_NAME}")
        else:
            print(f"  ❌  Error creating bucket: {e}", file=sys.stderr)
            raise


def disable_block_public_access(client):
    client.put_public_access_block(
        Bucket=BUCKET_NAME,
        PublicAccessBlockConfiguration={
            "BlockPublicAcls": False,
            "IgnorePublicAcls": False,
            "BlockPublicPolicy": False,
            "RestrictPublicBuckets": False,
        },
    )
    print("  ✅  Public access block disabled")


def set_bucket_policy(client):
    client.put_bucket_policy(
        Bucket=BUCKET_NAME,
        Policy=json.dumps(PUBLIC_READ_POLICY),
    )
    print("  ✅  Public-read bucket policy applied")


def set_cors(client):
    client.put_bucket_cors(
        Bucket=BUCKET_NAME,
        CORSConfiguration=CORS_CONFIG,
    )
    print("  ✅  CORS configuration applied")


def create_folder_placeholders(client):
    for folder in FOLDERS:
        client.put_object(Bucket=BUCKET_NAME, Key=folder, Body=b"")
        print(f"  ✅  Folder placeholder created: s3://{BUCKET_NAME}/{folder}")


def main():
    print(f"\n{'='*55}")
    print(f"  S3 Bucket Setup  (region: {AWS_REGION})")
    print(f"{'='*55}\n")
    client = get_client()

    print("Step 1: Creating bucket …")
    create_bucket(client)

    print("\nStep 2: Disabling block-public-access …")
    disable_block_public_access(client)

    print("\nStep 3: Applying public-read policy …")
    set_bucket_policy(client)

    print("\nStep 4: Configuring CORS …")
    set_cors(client)

    print("\nStep 5: Creating folder placeholders …")
    create_folder_placeholders(client)

    bucket_url = f"https://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com"
    print(f"\n🎉  Bucket ready!  URL: {bucket_url}\n")


if __name__ == "__main__":
    main()
