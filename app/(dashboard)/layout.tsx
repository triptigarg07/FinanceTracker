import { Suspense } from "react";
import { Header } from "@/components/header";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
};

export default DashboardLayout;
