import logging
import boto3
from botocore.exceptions import ClientError
from fastapi import HTTPException
from app.config import settings

logger = logging.getLogger(__name__)

_ses_client = None


def _get_client():
    global _ses_client
    if _ses_client is None:
        kwargs = {"region_name": settings.AWS_REGION}
        if settings.AWS_ACCESS_KEY_ID and settings.AWS_SECRET_ACCESS_KEY:
            kwargs["aws_access_key_id"] = settings.AWS_ACCESS_KEY_ID
            kwargs["aws_secret_access_key"] = settings.AWS_SECRET_ACCESS_KEY
        _ses_client = boto3.client("ses", **kwargs)
    return _ses_client


def _build_html(name: str, email: str, subject: str, message: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Portfolio Contact Form</title>
  <style>
    body {{ font-family: 'Segoe UI', Arial, sans-serif; background:#f4f4f4; margin:0; padding:0; }}
    .wrapper {{ max-width:620px; margin:40px auto; background:#ffffff; border-radius:10px;
                box-shadow:0 4px 16px rgba(0,0,0,0.10); overflow:hidden; }}
    .header {{ background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);
               padding:32px 40px; text-align:center; }}
    .header h1 {{ margin:0; color:#ffffff; font-size:22px; letter-spacing:1px; }}
    .header p  {{ margin:6px 0 0; color:#c9c9e3; font-size:13px; }}
    .body {{ padding:32px 40px; }}
    .field {{ margin-bottom:20px; }}
    .field label {{ display:block; font-size:11px; text-transform:uppercase;
                    letter-spacing:1px; color:#888; margin-bottom:4px; }}
    .field p {{ margin:0; font-size:15px; color:#222; line-height:1.6; word-break:break-word; }}
    .message-box {{ background:#f8f8ff; border-left:4px solid #302b63;
                    border-radius:4px; padding:14px 18px; margin-top:4px; }}
    .footer {{ background:#f0f0f0; padding:18px 40px; text-align:center;
               font-size:12px; color:#999; }}
    a {{ color:#302b63; text-decoration:none; }}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📬 New Contact Message</h1>
      <p>Someone reached out via your portfolio</p>
    </div>
    <div class="body">
      <div class="field">
        <label>From</label>
        <p>{name} &lt;<a href="mailto:{email}">{email}</a>&gt;</p>
      </div>
      <div class="field">
        <label>Subject</label>
        <p>{subject}</p>
      </div>
      <div class="field">
        <label>Message</label>
        <div class="message-box"><p>{message}</p></div>
      </div>
    </div>
    <div class="footer">
      Sent via Raj Chaudhary's Portfolio &nbsp;|&nbsp;
      <a href="https://github.com/XCHAUDHARY00">GitHub</a> &nbsp;|&nbsp;
      <a href="https://linkedin.com/in/rajchaudhary">LinkedIn</a>
    </div>
  </div>
</body>
</html>"""


def send_contact_email(name: str, email: str, subject: str, message: str) -> None:
    """Send a contact-form email to Raj's inbox via AWS SES."""
    from app.services.dynamodb import is_aws_configured
    if not is_aws_configured():
        logger.info("[DEV MODE] Contact email received from %s <%s>: %s - %s", name, email, subject, message)
        return

    html_body = _build_html(name, email, subject, message)
    text_body = (
        f"New contact form submission\n\n"
        f"From   : {name} <{email}>\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{message}"
    )
    try:
        _get_client().send_email(
            Source=settings.SES_FROM_EMAIL,
            Destination={"ToAddresses": [settings.SES_TO_EMAIL]},
            Message={
                "Subject": {"Data": f"[Portfolio] {subject}", "Charset": "UTF-8"},
                "Body": {
                    "Text": {"Data": text_body, "Charset": "UTF-8"},
                    "Html": {"Data": html_body, "Charset": "UTF-8"},
                },
            },
            ReplyToAddresses=[email],
        )
        logger.info("Contact email sent from %s <%s>", name, email)
    except ClientError as e:
        logger.error("SES send_email error: %s", e)
        raise HTTPException(status_code=500, detail="Failed to send email. Please try again later.")
