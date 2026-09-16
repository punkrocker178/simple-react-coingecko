import axios from "axios";
import type {
    CoinDetail,
    CoinGeckoMarketChartResponse,
    CoinGeckoOhlcResponse,
    CoinMarketsItem,
} from "@/models/coin-gecko";

export async function getMarketCoins(signal?: AbortSignal): Promise<CoinMarketsItem[]> {
    const { data } = await axios.get<CoinMarketsItem[]>('/api/coins/markets', {
        signal,
    });

    return data;
}

export async function getCoinDetail(
    coinId: string,
    signal?: AbortSignal,
): Promise<CoinDetail> {
    const { data } = await axios.get<CoinDetail>(`/api/coins/${coinId}`, {
        signal,
    });

    return data;
}

export async function getCoinOhlc(
    coinId: string,
    days: number,
    signal?: AbortSignal,
): Promise<CoinGeckoOhlcResponse> {
    const { data } = await axios.get<CoinGeckoOhlcResponse>(
        `/api/coins/${coinId}/ohlc`,
        {
            params: { days },
            signal,
        },
    );

    return data;
}

export async function getCoinMarketChart(
    coinId: string,
    days: number,
    signal?: AbortSignal,
): Promise<CoinGeckoMarketChartResponse> {
    const { data } = await axios.get<CoinGeckoMarketChartResponse>(
        `/api/coins/${coinId}/market_chart`,
        {
            params: { days },
            signal,
        },
    );

    return data;
}