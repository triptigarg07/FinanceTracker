// /app/api/seed/route.ts (if using App Router)
import { NextResponse } from "next/server";
import  {seedAll} from "@/scripts/seed"; // adjust path accordingly

export async function GET() {
  try {
    await seedAll();
    return NextResponse.json({ message: "Seed completed" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
