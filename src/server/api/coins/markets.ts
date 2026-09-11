import axios from "axios";
import { coinApi } from "@/server/utils/coin-api";
import type { CoinMarketsQuery, CoinMarketsResponse } from "@/models/coin-gecko";
import { defineHandler } from "nitro";

export default defineHandler(async (event) => {
    try {
        const params: Partial<CoinMarketsQuery> = event.context.query || {};
        params.vs_currency = params.vs_currency || 'usd';
        
        const { data } = await coinApi.get<CoinMarketsResponse>(`/coins/markets`, { params });
        return data;
    } catch (error: unknown) {
        console.error(axios.isAxiosError(error) ? error.response?.data : error);
        throw error;
    }
});