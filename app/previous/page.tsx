"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Draw {
    id: string;
    draw_date: string;
    lottery_name: string;
    draw_no: string;
    pdf_url?: string;
}

export default function PreviousResults() {
    const [draws, setDraws] = useState<Draw[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDraws() {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000/api";
                const res = await fetch(`${API_URL}/draws`);
                const result = await res.json();

                if (result.success) {
                    setDraws(result.data);
                } else {
                    setError("Failed to load draws.");
                }
            } catch (err) {
                setError("Error connecting to server.");
            } finally {
                setLoading(false);
            }
        }
        fetchDraws();
    }, []);

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-4">Previous Lottery Results</h1>
                <p className="text-muted-foreground">Browse past draws and check your tickets.</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-10">{error}</div>
            ) : draws.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">No past results found.</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {draws.map((draw) => (
                        <div key={draw.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">{format(new Date(draw.draw_date), "MMMM d, yyyy")}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1 text-foreground">{draw.lottery_name}</h3>
                            <p className="text-sm text-muted-foreground mb-6">Draw No: {draw.draw_no}</p>

                            <div className="flex flex-col gap-2">
                                <Link href={`/?date=${format(new Date(draw.draw_date), "yyyy-MM-dd")}`} className="w-full">
                                    <Button variant="primary" className="w-full justify-between group">
                                        Check Ticket
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>

                                {draw.pdf_url && (
                                    <a href={draw.pdf_url} target="_blank" rel="noreferrer" className="w-full">
                                        <Button variant="outline" className="w-full">
                                            View Official PDF
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
