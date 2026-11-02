"""
AWS Lambda entry-point.
This module re-exports the Mangum ASGI handler from app.main
so it can be referenced as `lambda_handler.handler` in the
Lambda function configuration.
"""
from app.main import handler  # noqa: F401
