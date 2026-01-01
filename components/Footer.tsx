import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border bg-card text-muted-foreground mt-auto">
            <div className="container max-w-screen-2xl mx-auto py-8 px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Kerala Lottery Result</h3>
                        <p className="text-sm">
                            The fastest and most reliable way to check your Kerala State Lottery results. Updated daily.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-primary">Check Result</Link></li>
                            <li><Link href="/previous" className="hover:text-primary">Previous Results</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border text-center text-xs">
                    <p>© {new Date().getFullYear()} Kerala Lottery Result. All rights reserved.</p>
                    <p className="mt-2 text-muted-foreground/60">
                        Disclaimer: This website is for informational purposes only and is not affiliated with the Government of Kerala.
                    </p>
                </div>
            </div>
        </footer>
    );
}
