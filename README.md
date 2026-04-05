# Enviro Civec Website

This is the source code for the Enviro Civec website, a modern engineering consulting platform.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)

## Getting Started

Follow these steps to run the project locally on your machine.

### 1. Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

### 2. Setup Database

Initialize the local SQLite database and populate it with sample content:

```bash
# Push the schema to the database
npm run db:push

# Seed the database with sample data (Services, Projects, Team, etc.)
npm run db:seed
```

### 3. Run the Development Server

Start the website locally:

```bash
npm run dev
```

The website will be available at: **http://localhost:5000**

## Deployment (Live)

To deploy this website live, you have a few options:

### Option A: VPS (Virtual Private Server)
Since this project uses a local SQLite database file (`local.db`), the easiest way to deploy it is on a VPS like **DigitalOcean**, **Hetzner**, or **AWS EC2**.
1. Upload the files to the server.
2. Run `npm install`, `npm run build`, and `npm start`.
3. Use a process manager like `pm2` to keep it running.

### Option B: Cloud Hosting (Render / Fly.io)
Platforms like **Render** or **Fly.io** support persistent disk storage, which is needed for SQLite.
- **Render**: Create a Web Service, attach a Disk, and set the database path to that disk.

### Option C: Vercel / Netlify (Requires Database Change)
If you want to use **Vercel** or **Netlify**, you cannot use a local SQLite file because these platforms are "serverless" and don't keep files permanently.
- You would need to switch the database back to a cloud provider like **Neon (PostgreSQL)** or **Turso (SQLite)**.
- Update `.env` with the new database URL.
