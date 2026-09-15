import axios, { AxiosError } from "axios";
import { coinApi } from "@/server/utils/coin-api";
import type { CoinMarketsQuery, CoinMarketsResponse } from "@/models/coin-gecko";
import { defineHandler } from "nitro";
import { getQuery } from "nitro/h3";

export default defineHandler(async (event) => {
    try {
        const params: Partial<CoinMarketsQuery> = getQuery(event);
        params.vs_currency = params.vs_currency || 'usd';
        const coinId = event.context.params!.id;

        const { data } = await coinApi.get<CoinMarketsResponse>(`/coins/${coinId}/ohlc`, {
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