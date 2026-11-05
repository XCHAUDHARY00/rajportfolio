# 🚀 AWS Amplify Hosting Guide — Raj Chaudhary Portfolio

Follow these simple steps to deploy your portfolio on **AWS Amplify Hosting** to meet the official Hackathon requirement.

---

### Step 1: Open AWS Amplify Console
1. Log in to your AWS Management Console: [https://console.aws.amazon.com/amplify](https://console.aws.amazon.com/amplify)
2. Make sure your region is set to **ap-south-1 (Mumbai)** or **us-east-1 (N. Virginia)**.
3. Click the orange button: **Deploy an app** or **Host web app** (under "Amplify Hosting").

---

### Step 2: Connect GitHub Repository
1. Select **GitHub** as your source code provider and click **Next**.
2. If prompted, authorize AWS Amplify to access your GitHub account.
3. Select:
   - **Repository**: `XCHAUDHARY00/rajportfolio`
   - **Branch**: `main`
4. Click **Next**.

---

### Step 3: Confirm Build Settings
1. AWS Amplify will automatically detect the `amplify.yml` configuration file already committed in the repository.
2. Under **Environment variables** (optional), you can add:
   - `VITE_API_URL`: `https://rajportfolio-eqaw.vercel.app`
3. Click **Next** -> Review summary -> Click **Save and deploy**.

---

### Step 4: Add Single-Page Application (SPA) Rewrite Rule
To make sure routes like `/skills`, `/certificates`, `/projects` load directly on refresh without 404:
1. In the Amplify Console left sidebar, go to **App settings** &rarr; **Rewrites and redirects**.
2. Click **Edit** and ensure this rule is present (or click **Add rule**):
   - **Source address**: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>`
   - **Target address**: `/index.html`
   - **Type**: `200 (Rewrite)`
3. Click **Save**.

---

### Step 5: Copy Your Live AWS Amplify URL
Once the build completes (takes ~2 minutes):
- You will receive a live URL: `https://main.dXXXXXXXXX.amplifyapp.com`
- This is your **official AWS-hosted URL** required for the hackathon submission form!
- You can also optionally link your custom domain `rajchaudhary.me` in Amplify under **App settings** &rarr; **Domain management**.
