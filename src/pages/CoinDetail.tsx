import { EchartWrapper } from "@/components/chart/echart-wrapper";
import type { CoinDetail } from "@/models/coin-gecko";
import axios from "axios";
import type { EChartsOption } from "echarts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function CoinDetail() {
    const { id: coinId } = useParams();
    const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [echartOptions, setEchartOptions] = useState<EChartsOption | undefined>(undefined);
    const canRenderCoin = !isLoading && !!coinDetail;

    useEffect(() => {
        const abort = new AbortController();
        async function fetchCoinDetail() {

            setIsLoading(true);
            const data = await axios<CoinDetail>(`/api/coins/${coinId}`, { signal: abort.signal });
            setCoinDetail(data.data)
            setIsLoading(false);
        }

        async function fetchOhlc() {
            const data = await axios(`/api/coins/${coinId}/ohlc`, { 
                params: {
                    days: 1
                }, 
            signal: abort.signal
         });
            console.log(data.data);
            const echartOptions: EChartsOption = {
                xAxis: {
                    type: 'time',
                    
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        type: 'candlestick',
                        data: data.data,
                        encode: {
                            x: 0
                        }
                    },
                ],
            };
            setEchartOptions(echartOptions);
        }
        void fetchCoinDetail();
        void fetchOhlc();
        return () => abort.abort();
    }, [coinId]);

    return (<>
        <div>
            {!canRenderCoin ? "Loading..." :
                <div>
                    <div>{`${coinDetail?.name} (${coinDetail?.symbol})`}</div>
                    <div>{coinDetail.description?.en}</div>
                    <EchartWrapper options={echartOptions}></EchartWrapper>
                </div>
            }
        </div>
    </>);
}