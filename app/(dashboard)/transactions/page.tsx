import { Suspense } from "react";
import TransactionsContent from "./transactions-content";

export default function TransactionsPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <TransactionsContent />
    </Suspense>
  );
}
