# Deployment Guide - Telegram SMM Panel

To deploy this panel permanently for free, we will use **Vercel** for the frontend/backend and **Supabase** or **Neon** for the database.

## Step 1: Prepare the Database (Supabase)
1.  **Project URL**: `https://eetrvtexoirmmspgffak.supabase.co`
2.  **Anon Key**: `sb_publishable_kkmtfw7kjDlPhGp6BoURuQ_SEB29rbZ`
3.  **Connection String**: `postgresql://postgres:[YOUR-PASSWORD]@db.eetrvtexoirmmspgffak.supabase.co:5432/postgres`
    *(Replace `[YOUR-PASSWORD]` with your actual Supabase database password)*

## Step 2: Push to GitHub
1.  Create a new repository on [GitHub](https://github.com/).
2.  Initialize git in your project:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <your-github-repo-url>
    git push -u origin main
    ```

## Step 3: Deploy to Vercel
1.  Go to [Vercel](https://vercel.com/) and click **Add New > Project**.
2.  Import your GitHub repository.
3.  In the **Environment Variables** section, add the following:
    - `DATABASE_URL`: Your Supabase connection string.
    - `NEXTAUTH_SECRET`: Run `openssl rand -base64 32` to generate a random secret.
    - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., `https://your-project.vercel.app`).
    - `TELEGRAM_API_ID`: Your Telegram API ID from [my.telegram.org](https://my.telegram.org).
    - `TELEGRAM_API_HASH`: Your Telegram API Hash.
4.  Click **Deploy**.

## Step 4: Initialize the Database
Once deployed, Vercel will run `npx prisma generate`. You need to sync your schema with the cloud database. You can do this from your local machine:
```bash
DATABASE_URL="your_supabase_url" npx prisma db push
```

## Important Notes
- **Persistence**: SQLite is not supported on Vercel because it is serverless. Using PostgreSQL (via Supabase/Neon) ensures your users, orders, and balances are saved permanently.
- **Telegram Sessions**: For real mass adding, you will need to store Telegram session strings in your database and use them in `src/lib/telegram.ts`.
