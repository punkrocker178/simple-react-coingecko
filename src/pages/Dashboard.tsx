import axios from "axios";
import { useEffect, useState } from "react";
import { CoinTable } from "@/components/finance/coin-table";
import { getMarketCoins } from "@/services/coin-service";
import type { CoinMarketsItem } from "@/models/coin-gecko";

export function Dashboard() {
    const [coins, setCoins] = useState<CoinMarketsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCoins() {
            try {
                setCoins(await getMarketCoins(controller.signal));
            } catch (error: unknown) {
                if (!axios.isCancel(error)) {
                    setError("Unable to load market data.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        void fetchCoins();

        return () => controller.abort();
    }, []);

    return (
        <section className="space-y-4 sm:space-y-6">
            <header className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    Markets
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Dashboard Page
                </h1>
            </header>

            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-6">
                <CoinTable coins={coins} isLoading={isLoading} error={error} />
            </div>
        </section>
    );
}