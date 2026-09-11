import type { CoinDetail } from "@/models/coin-gecko";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function CoinDetail() {
    const { id: coinId } = useParams();
    const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const canRenderCoin = !isLoading && !!coinDetail;

    useEffect(() => {
        const abort = new AbortController();
        async function fetchCoinDetail() {

            setIsLoading(true);
            const data = await axios<CoinDetail>(`/api/coins/${coinId}`, { signal: abort.signal });
            setCoinDetail(data.data)
            setIsLoading(false);
        }
        void fetchCoinDetail();
        return () => abort.abort();
    }, [coinId]);

    return (<>
        <div>
            {!canRenderCoin ? "Loading..." :
                <div>
                    <div>{`${coinDetail?.name} (${coinDetail?.symbol})`}</div>
                    <div>{coinDetail.description?.en}</div>
                </div>
            }
        </div>
    </>);
}