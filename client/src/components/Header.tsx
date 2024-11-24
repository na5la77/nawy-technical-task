import { HomeIcon } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="bg-background p-4 border-b z-20">
      <div className="flex items-center justify-between w-full flex-wrap gap-5">
        <div className="flex items-center gap-4">
          <Link
            href="https://www.nawy.com/"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-12 h-12 rounded-md overflow-hidden bg-primary dark:bg-logo flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Nawy's Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </Link>
          <Link href="/listings">
            <Button
              variant="ghost"
              size="icon"
              aria-label="home"
              title="home"
              className="w-12 h-12 flex items-center justify-center rounded-lg"
            >
              <HomeIcon />
            </Button>
          </Link>
        </div>
        <div className="flex w-12 h-12">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
