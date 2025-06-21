"use client";

import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
// import { useEffect, useRef } from "react";

export default function DashboardPage() {
  //const hasSeeded = useRef(false);

  /*useEffect(() => {
    if (!hasSeeded.current) {
      fetch("/api/seed")
        .then((res) => res.json())
        .then((data) => {
          console.log("Seed result:", data);
          hasSeeded.current = true;
        })
        .catch((err) => console.error("Seed error:", err));
    }
  }, []);*/
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  );
}
