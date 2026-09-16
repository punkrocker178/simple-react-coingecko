import { CoinTable } from "@/components/finance/coin-table";

export function Dashboard() {
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
                <CoinTable />
            </div>
        </section>
    );
}