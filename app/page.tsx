import { Suspense } from "react";
import { LotterySearchForm } from "@/components/LotterySearchForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-background to-secondary/10 flex-1">
      <div className="text-center space-y-4 mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gradient bg-gradient-brand text-transparent bg-clip-text pb-2">
          Did You Win Today?
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Instantly check your Kerala State Lottery ticket. Enter your details below to see the result.
        </p>
      </div>

      <Suspense fallback={<div className="h-[400px] w-full max-w-md bg-card animate-pulse rounded-xl" />}>
        <LotterySearchForm />
      </Suspense>

      <section className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 text-xl">🚀</div>
          <h3 className="font-bold text-lg mb-2">Instant Results</h3>
          <p className="text-sm text-muted-foreground">Get results immediately after the draw time at 3:00 PM.</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="h-10 w-10 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-4 text-xl">🛡️</div>
          <h3 className="font-bold text-lg mb-2">100% Secure</h3>
          <p className="text-sm text-muted-foreground">We never store your personal data. Your privacy is our priority.</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="h-10 w-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 text-xl">📄</div>
          <h3 className="font-bold text-lg mb-2">Official Sources</h3>
          <p className="text-sm text-muted-foreground">Directly sourced from official Kerala State Lottery Department PDFs.</p>
        </div>
      </section>

      {/* Banner Ad Placeholder */}
      {/* <div className="w-full max-w-[728px] h-[90px] bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center mt-16 text-muted-foreground">
        Google AdSense Banner (Home Bottom)
      </div> */}
    </div>
  );
}
