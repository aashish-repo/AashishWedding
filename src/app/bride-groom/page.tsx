import type { Metadata } from "next";
import { BrideGroomPage } from "@/components/BrideGroomPage";

export const metadata: Metadata = {
  title: "Bride & Groom — Aashish & Amisha",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <BrideGroomPage />;
}
