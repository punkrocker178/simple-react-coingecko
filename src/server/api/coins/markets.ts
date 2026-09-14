import axios, { AxiosError } from "axios";
import { coinApi } from "@/server/utils/coin-api";
import type { CoinMarketsQuery, CoinMarketsResponse } from "@/models/coin-gecko";
import { defineHandler } from "nitro";

export default defineHandler(async (event) => {
    try {
        const params: Partial<CoinMarketsQuery> = event.context.query || {};
        params.vs_currency = params.vs_currency || 'usd';

        const { data } = await coinApi.get<CoinMarketsResponse>(`/coins/markets`, {
            params,
            headers: {
                'x-cg-demo-api-key': event.req.headers.get('x-cg-demo-api-key') || '',
            },
        });
        return data;
    } catch (error: unknown) {
        console.log((error as AxiosError).request.headers);
        console.error(axios.isAxiosError(error) ? (error as AxiosError).response?.data : error);
        throw error;
    }
});