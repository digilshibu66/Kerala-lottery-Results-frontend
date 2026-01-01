import Link from "next/link";
import { Ticket } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-primary">
                    <Ticket className="h-6 w-6" />
                    <span>Kerala Lottery Result</span>
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">
                        Today's Result
                    </Link>
                    <Link href="/previous" className="transition-colors hover:text-primary">
                        Previous Results
                    </Link>
                    <Link href="/about" className="hidden md:block transition-colors hover:text-primary">
                        About
                    </Link>
                </nav>
            </div>
        </header>
    );
}
