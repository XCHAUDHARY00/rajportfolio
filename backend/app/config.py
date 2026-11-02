import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    AWS_REGION: str = os.getenv("AWS_REGION", "ap-south-1")
    AWS_ACCESS_KEY_ID: str = os.getenv("AWS_ACCESS_KEY_ID", "")
    AWS_SECRET_ACCESS_KEY: str = os.getenv("AWS_SECRET_ACCESS_KEY", "")
    S3_BUCKET_NAME: str = os.getenv("S3_BUCKET_NAME", "raj-portfolio-assets")
    COGNITO_USER_POOL_ID: str = os.getenv("COGNITO_USER_POOL_ID", "")
    COGNITO_CLIENT_ID: str = os.getenv("COGNITO_CLIENT_ID", "")
    SES_FROM_EMAIL: str = os.getenv("SES_FROM_EMAIL", "dhariwalraj37@gmail.com")
    SES_TO_EMAIL: str = os.getenv("SES_TO_EMAIL", "dhariwalraj37@gmail.com")
    DYNAMODB_TABLE_PREFIX: str = os.getenv("DYNAMODB_TABLE_PREFIX", "portfolio_")
    CLOUDFRONT_URL: str = os.getenv("CLOUDFRONT_URL", "")
    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "dhariwalraj37@gmail.com")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "raj@portfolio2026")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "raj-portfolio-super-secret-key-2026")


settings = Settings()
