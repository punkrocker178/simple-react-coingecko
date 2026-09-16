import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import type { CoinMarketsItem } from "@/models/coin-gecko";
import { useNavigate } from "react-router";

interface CoinTableProps {
    coins: CoinMarketsItem[];
    isLoading: boolean;
    error: string | null;
}

export function CoinTable({ coins, isLoading, error }: CoinTableProps) {
    const navigate = useNavigate();

    const navigateToCoinDetail = (coinId: string) => {
        navigate(`/coin/${coinId}`);
    };

    const formatCurrency = (value: number | null) =>
        value === null
            ? 'N/A'
            : new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(value);

    return (
        <div className="w-full overflow-hidden">
            <Table className="min-w-full">
                <TableCaption className="pb-3 text-left text-xs text-slate-500 sm:text-sm">
                    Current cryptocurrency market data.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-3 py-3 text-xs uppercase tracking-wide text-slate-500 sm:px-4">Coin</TableHead>
                        <TableHead className="px-3 py-3 text-xs uppercase tracking-wide text-slate-500 sm:px-4">Price</TableHead>
                        <TableHead className="px-3 py-3 text-xs uppercase tracking-wide text-slate-500 sm:px-4">24h Change</TableHead>
                        <TableHead className="px-3 py-3 text-xs uppercase tracking-wide text-slate-500 sm:px-4">24h Volume</TableHead>
                        <TableHead className="px-3 py-3 text-xs uppercase tracking-wide text-slate-500 sm:px-4">Market Cap</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell className="px-3 py-4 text-sm text-slate-600 sm:px-4" colSpan={5}>
                                Loading market data...
                            </TableCell>
                        </TableRow>
                    )}
                    {error && (
                        <TableRow>
                            <TableCell className="px-3 py-4 text-sm text-red-600 sm:px-4" colSpan={5}>
                                {error}
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && !error && coins.map((coin) => {
                        const priceChangeData = coin.price_change_24h
                            ? `${formatCurrency(coin.price_change_24h)} (${coin.price_change_percentage_24h?.toFixed(2)}%)`
                            : null;

                            let priceChangeDisplay = null;

                            if (coin.price_change_24h && coin.price_change_24h > 0) {
                                priceChangeDisplay = <span className="font-medium text-green-600">{priceChangeData}</span>;
                            } else if (coin.price_change_24h && coin.price_change_24h < 0) {
                                priceChangeDisplay = <span className="font-medium text-red-600">{priceChangeData}</span>;
                            }

                        return (
                            <TableRow key={coin.id} onClick={() => navigateToCoinDetail(coin.id)}>
                                <TableCell className="px-3 py-3 text-sm font-medium text-slate-900 sm:px-4">
                                    {coin.name} ({coin.symbol.toUpperCase()})
                                </TableCell>
                                <TableCell className="px-3 py-3 text-sm text-slate-700 sm:px-4">{formatCurrency(coin.current_price)}</TableCell>
                                <TableCell className="px-3 py-3 text-sm sm:px-4">{priceChangeData ? priceChangeDisplay : '-'}</TableCell>
                                <TableCell className="px-3 py-3 text-sm text-slate-700 sm:px-4">{formatCurrency(coin.total_volume)}</TableCell>
                                <TableCell className="px-3 py-3 text-sm text-slate-700 sm:px-4">{formatCurrency(coin.market_cap)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}