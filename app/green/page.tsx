import type { Metadata } from "next";
import Site from "@/components/Site";

// The gold-and-green variation, for comparison; kept out of search results.
export const metadata: Metadata = { robots: { index: false, follow: false }, alternates: { canonical: "/" } };

export default function Green() {
  return <Site palette="green" />;
}
