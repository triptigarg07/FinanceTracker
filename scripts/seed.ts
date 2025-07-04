import { config } from "dotenv";
import { subDays, eachDayOfInterval, format } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categories, accounts, transactions } from "../db/schema";
import { convertAmountToMiliunits } from "../lib/utils";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2xHd2XTaY8oOJZuG1AUz0EzzqHD";

const SEED_CATEGORIES = [
  { id: "category_1", name: "Food", userId: SEED_USER_ID },
  { id: "category_2", name: "Rent", userId: SEED_USER_ID },
  { id: "category_3", name: "Utilities", userId: SEED_USER_ID },
  { id: "category_7", name: "Clothing", userId: SEED_USER_ID },
];

const SEED_ACCOUNTS = [
  { id: "account_1", name: "Checking", userId: SEED_USER_ID },
  { id: "account_2", name: "Savings", userId: SEED_USER_ID },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: typeof transactions.$inferSelect[] = [];

const generateRandomAmount = (category: typeof SEED_CATEGORIES[number]) => {
  switch (category.name) {
    case "Rent": return Math.random() * 400 + 90;
    case "Utilities": return Math.random() * 200 + 50;
    case "Food": return Math.random() * 30 + 10;
    case "Transportation":
    case "Health": return Math.random() * 50 + 15;
    case "Entertainment":
    case "Clothing":
    case "Miscellaneous": return Math.random() * 100 + 20;
    default: return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numTransactions; i++) {
    const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMiliunits(isExpense ? -amount : amount);

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Merchant",
      notes: "Random transaction",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach(generateTransactionsForDay);
};

// 🧩 All-in-one seed function
export const seedAll = async () => {
  try {
    generateTransactions();

    console.log("🌱 Resetting database...");
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

    console.log("🌱 Seeding categories...");
    await db.insert(categories).values(SEED_CATEGORIES).execute();

    console.log("🌱 Seeding accounts...");
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();

    console.log("🌱 Seeding transactions...");
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();

    console.log("✅ Seeding complete!");
  } catch (error) {
    console.error("❌ Error during seed:", error);
    process.exit(1);
  }
};

// Optional: execute directly if running this file
if (process.argv[1].endsWith("seed.mts")) {
  seedAll();
}
