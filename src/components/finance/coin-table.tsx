import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import type { CoinMarketsItem } from "@/models/coin-gecko";
import { useNavigate } from "react-router";

export function CoinTable() {
    const navigate = useNavigate();
    const [coins, setCoins] = useState<CoinMarketsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCoins() {
            try {
                const { data } = await axios.get<CoinMarketsItem[]>('/api/coins/markets', {
                    signal: controller.signal,
                });
                setCoins(data);
            } catch (error: unknown) {
                if (!axios.isCancel(error)) {
                    setError('Unable to load market data.');
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
        <div>
            <Table>
                <TableCaption>Current cryptocurrency market data.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Coin</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>24h Change</TableHead>
                        <TableHead>24h Volume</TableHead>
                        <TableHead>Market Cap</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={4}>Loading market data...</TableCell>
                        </TableRow>
                    )}
                    {error && (
                        <TableRow>
                            <TableCell colSpan={4}>{error}</TableCell>
                        </TableRow>
                    )}
                    {!isLoading && !error && coins.map((coin) => {
                        const priceChangeData = coin.price_change_24h
                            ? `${formatCurrency(coin.price_change_24h)} (${coin.price_change_percentage_24h?.toFixed(2)}%)`
                            : null;

                            let priceChangeDisplay = null;

                            if (coin.price_change_24h &&coin.price_change_24h > 0) {
                                priceChangeDisplay = <span className="text-green-500">{priceChangeData}</span>;
                            } else if (coin.price_change_24h && coin.price_change_24h < 0) {
                                priceChangeDisplay = <span className="text-red-500">{priceChangeData}</span>;
                            }

                        return (
                            <TableRow key={coin.id} onClick={() => navigateToCoinDetail(coin.id)}>
                                <TableCell>{coin.name} ({coin.symbol.toUpperCase()})</TableCell>
                                <TableCell>{formatCurrency(coin.current_price)}</TableCell>
                                <TableCell>{priceChangeData ? priceChangeDisplay : '-'}</TableCell>
                                <TableCell>{formatCurrency(coin.total_volume)}</TableCell>
                                <TableCell>{formatCurrency(coin.market_cap)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}