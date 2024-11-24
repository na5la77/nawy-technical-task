import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};
export default function NotFound() {
  return (
    <div className="px-4 w-full py-12">
      <div className="flex flex-col items-center justify-center mx-auto py-8 gap-5">
        <h2 className="text-2xl">Page Not Found</h2>
        <Image
          src="/images/not-found.png"
          width={400}
          height={400}
          alt="not-found"
          sizes="400px"
          priority={true}
          title="Page Not Found"
        />

        <Button variant="outline">
          <Link href="/listings" className="text-xl">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
