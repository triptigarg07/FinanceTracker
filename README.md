# FinanceTracker

A modern, full-stack personal finance management app built with Next.js, Drizzle ORM, Clerk authentication, and Tailwind CSS. Easily track your accounts, categorize transactions, visualize spending, and import/export your financial data.

---

![FinanceTracker Logo](public/logo.svg)

## Features

- **User Authentication**: Secure sign-in/sign-up with [Clerk](https://clerk.com/).
- **Dashboard Overview**: Visualize your financial health with charts and summaries.
- **Accounts Management**: Add, edit, and delete multiple accounts (e.g., Checking, Savings).
- **Categories**: Organize your spending/income with customizable categories.
- **Transactions**: Add, edit, delete, and bulk import transactions (CSV supported).
- **Data Import**: Import transactions from CSV files (see `transaction_data_updated.csv` for an example).
- **Bulk Actions**: Bulk delete for accounts, categories, and transactions.
- **Responsive UI**: Beautiful, mobile-friendly design with dark mode support.
- **Filters & Search**: Filter transactions by date, account, and category.
- **Charts & Analytics**: Interactive charts for spending, income, and trends.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Backend**: [Hono](https://hono.dev/) API routes
- **Database**: PostgreSQL (via [Neon](https://neon.tech/)), [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Clerk](https://clerk.com/)
- **State & Data**: [React Query](https://tanstack.com/query/latest), [Zustand](https://zustand-demo.pmnd.rs/)
- **UI**: [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **CSV Parsing**: [react-papaparse](https://www.npmjs.com/package/react-papaparse)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/FinanceTracker.git
cd FinanceTracker
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

Create a `.env.local` file in the root with the following (replace with your own values):

```env
DATABASE_URL=your_postgres_connection_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

> _You can get a free Postgres database from [Neon](https://neon.tech/) and Clerk keys from [Clerk Dashboard](https://dashboard.clerk.com/)_

### 4. Database setup & migrations

```bash
# Generate and run migrations
npm run db:generate
npm run db:migrate

# (Optional) Seed the database with demo data
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage

- **Sign up or sign in** with Clerk.
- **Add accounts** (e.g., Checking, Savings).
- **Create categories** (e.g., Food, Rent, Utilities).
- **Add or import transactions** (CSV import supported).
- **View dashboard** for charts and summaries.
- **Filter/search** transactions by date, account, or category.
- **Bulk delete** items as needed.

### CSV Import Example

You can import transactions using a CSV file. See `transaction_data_updated.csv` for a sample format. The import tool lets you map columns to the required fields (amount, date, payee).

---

## Folder Structure

```
app/           # Next.js app directory (pages, API routes, layouts)
components/    # Reusable UI components
features/      # Feature-based modules (accounts, categories, transactions)
db/            # Database schema and Drizzle ORM setup
scripts/       # Seed scripts
public/        # Static assets (logo, icons)
```

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Clerk](https://clerk.com/)
- [Neon](https://neon.tech/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

  **Built by Tripti Garg**
