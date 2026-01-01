"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Search, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "@/lib/utils";

interface SearchResult {
    found: boolean;
    result: "WIN" | "NO_WIN";
    data: {
        lotteryName: string;
        drawNo: string;
        prizeName?: string;
        prizeAmount?: string;
        winningTicket?: string;
        pdfUrl?: string;
    };
    message?: string;
}

export function LotterySearchForm() {
    return (
        <Suspense fallback={<SearchFormContent />}>
            <SearchFormContent />
        </Suspense>
    );
}

function SearchFormContent() {
    const searchParams = useSearchParams();
    const initialDate = searchParams.get("date");

    const [date, setDate] = useState<string>(initialDate || format(new Date(), "yyyy-MM-dd"));
    const [ticket, setTicket] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SearchResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialDate) {
            setDate(initialDate);
        }
    }, [initialDate]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ticket) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // In production, this URL should be an environment variable
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000/api";

            const res = await fetch(`${API_URL}/check?date=${date}&ticket=${ticket}`);
            const data = await res.json();

            if (data.success) {
                setResult(data);
            } else {
                setError(data.message || "An error occurred.");
            }
        } catch (err) {
            setError("Failed to fetch results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="bg-card border border-border rounded-xl p-6 shadow-xl shadow-black/5">
                <h2 className="text-2xl font-bold text-center mb-6">Check Your Ticket</h2>
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Draw Date
                        </label>
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Ticket Number
                        </label>
                        <Input
                            type="text"
                            placeholder="Ex: AB 123456"
                            value={ticket}
                            onChange={(e) => setTicket(e.target.value)}
                            required
                            className="w-full uppercase"
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading} size="lg">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                        Check Result
                    </Button>
                </form>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-4 rounded-lg text-center animate-in fade-in slide-in-from-bottom-2">
                    {error}
                </div>
            )}

            {result && (
                <div className={cn(
                    "bg-card border rounded-xl p-6 text-center shadow-xl animate-in fade-in slide-in-from-bottom-4",
                    result.result === "WIN" ? "border-green-500 ring-1 ring-green-500 bg-green-50/50 dark:bg-green-900/10" : "border-border"
                )}>
                    {result.result === "WIN" ? (
                        <div className="space-y-4">
                            <div className="text-5xl mb-2">🎉</div>
                            <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">Winning Ticket!</h3>
                            <div className="py-4">
                                <p className="text-lg font-medium text-muted-foreground">You have won</p>
                                <p className="text-4xl font-extrabold text-foreground mt-1">₹ {parseFloat(result.data.prizeAmount || "0").toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground mt-2 font-medium bg-green-100 dark:bg-green-900/30 inline-block px-3 py-1 rounded-full">{result.data.prizeName}</p>
                            </div>
                            <div className="text-sm text-left bg-background/50 p-4 rounded-lg border border-border/50 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Lottery:</span>
                                    <span className="font-medium">{result.data.lotteryName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Draw No:</span>
                                    <span className="font-medium">{result.data.drawNo}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Match:</span>
                                    <span className="font-medium">{result.data.winningTicket}</span>
                                </div>
                            </div>
                        </div>
                    ) : result.found ? (
                        <div className="space-y-4">
                            <div className="text-5xl mb-2">😕</div>
                            <h3 className="text-2xl font-bold text-muted-foreground">Better luck next time</h3>
                            <p className="text-muted-foreground">No prize found for this ticket number.</p>
                            <div className="text-sm text-left bg-background/50 p-4 rounded-lg border border-border/50 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Lottery:</span>
                                    <span className="font-medium">{result.data.lotteryName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Draw No:</span>
                                    <span className="font-medium">{result.data.drawNo}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="text-4xl mb-2">📅</div>
                            <h3 className="text-xl font-bold text-foreground">No Result Found</h3>
                            <p className="text-muted-foreground">{result.message}</p>
                        </div>
                    )}

                    {result.data?.pdfUrl && (
                        <a
                            href={result.data.pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline"
                        >
                            View Official Result PDF &rarr;
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
