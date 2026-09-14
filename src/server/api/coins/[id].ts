import { defineHandler } from "nitro";
import type { CoinDetail } from "@/models/coin-gecko";
import { coinApi } from "../../utils/coin-api";

export default defineHandler(async (event) => {
    const coinId = event.context.params!.id;
    const { data } = await coinApi.get<CoinDetail>(`/coins/${coinId}`, {
        headers: {
            'x-cg-demo-api-key': event.req.headers.get('x-cg-demo-api-key') || '',
        },
    });
    return data;
});