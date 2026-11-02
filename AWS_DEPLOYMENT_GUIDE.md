# ☁️ AWS Deployment Guide — Raj Chaudhary Portfolio

Step-by-step instructions to deploy your portfolio on AWS.

---

## 📋 Prerequisites

1. An active AWS Account.
2. AWS CLI installed and configured:
   ```bash
   aws configure
   # Enter your:
   # - AWS Access Key ID
   # - AWS Secret Access Key
   # - Default region (e.g., ap-south-1 for Mumbai)
   # - Default output format (json)
   ```

---

## 🛠️ Step 1: Create Backend Environment File

Navigate to `backend/` and create `.env` based on `.env.example`:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your AWS details:
```env
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=YOUR_ACTUAL_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_ACTUAL_SECRET_KEY
S3_BUCKET_NAME=raj-portfolio-assets-unique-id
COGNITO_USER_POOL_ID=
COGNITO_CLIENT_ID=
SES_FROM_EMAIL=dhariwalraj37@gmail.com
SES_TO_EMAIL=dhariwalraj37@gmail.com
DYNAMODB_TABLE_PREFIX=portfolio_
CLOUDFRONT_URL=
```

---

## 🗄️ Step 2: Initialize DynamoDB Tables

Run the automated provisioning script:

```bash
python3 infrastructure/dynamodb_setup.py
```

This will automatically create all 6 DynamoDB tables with on-demand (pay-per-request / free-tier friendly) billing:
- `portfolio_profile`
- `portfolio_projects`
- `portfolio_skills`
- `portfolio_experience`
- `portfolio_certifications`
- `portfolio_achievements`

---

## 🪣 Step 3: Initialize S3 Assets Bucket

Run the S3 setup script:

```bash
python3 infrastructure/s3_setup.py
```

This will:
- Create the bucket in your configured region.
- Configure CORS rules for cross-origin uploads from your frontend.
- Set up folders: `profile/`, `projects/`, `certifications/`, `experience/`, `resume/`.
- Apply public read policy for uploaded assets.

---

## 📧 Step 4: Verify Email in AWS SES

1. Open AWS Console → **Amazon Simple Email Service (SES)**.
2. Under **Verified identities**, click **Create identity**.
3. Choose **Email address**, enter `dhariwalraj37@gmail.com`, and submit.
4. Open the verification email sent by Amazon in your inbox and click the verification link.
5. Your contact form can now send emails without any third-party API key!

---

## ⚡ Step 5: Deploy FastAPI to AWS Lambda + API Gateway

You can deploy the backend using AWS Lambda and API Gateway:

### Option A: Using AWS SAM or Serverless Framework
1. Package the backend:
   ```bash
   cd backend
   pip install -r requirements.txt -t package/
   cp -r app package/
   cp lambda_handler.py package/
   cd package && zip -r ../backend.zip .
   ```
2. In AWS Lambda Console:
   - Create Function (Python 3.11 or 3.12).
   - Upload `backend.zip`.
   - Set Handler to `lambda_handler.handler`.
   - Add Environment Variables matching your `.env`.
   - Attach an **API Gateway (HTTP API)** trigger routing all traffic (`ANY /{proxy+}`) to Lambda.

---

## 🌐 Step 6: Deploy Frontend (S3 + CloudFront)

1. Build production static bundle:
   ```bash
   cd frontend
   # Set your backend API URL in .env
   echo "VITE_API_URL=https://your-api-gateway-url.amazonaws.com" > .env.production
   npm run build
   ```
2. Create an S3 bucket for website hosting (e.g. `rajchaudhary-portfolio-site`).
3. Sync the `dist/` directory to S3:
   ```bash
   aws s3 sync dist/ s3://rajchaudhary-portfolio-site --delete
   ```
4. Create a **CloudFront Distribution**:
   - Set Origin to your S3 website endpoint.
   - Set Default Root Object to `index.html`.
   - Configure Custom Error Response (404 and 403 redirect to `/index.html` with status 200 for SPA routing).
   - Attach an ACM SSL certificate for `rajchaudhary.me` or your domain.

---

## 🎯 Verification Checklist

- [ ] Public site loads at your domain or CloudFront URL.
- [ ] Profile, Skills, Projects, Experience, and Certifications fetch smoothly.
- [ ] Contact form sends email to `dhariwalraj37@gmail.com`.
- [ ] Admin login allows changing Profile Photo, Resume, CGPA, and Projects.

