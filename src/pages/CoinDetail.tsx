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
  const [echartOptions, setEchartOptions] = useState<EChartsOption | undefined>(
    undefined,
  );
  const canRenderCoin = !isLoading && !!coinDetail;

  const decimalPlace = (value: number) => {
    const s = value.toString();
    if (!s.includes(".")) return 0;

    const decimals = s.split(".")[1];
    const firstNonZero = decimals.search(/[1-9]/);

    return firstNonZero === -1 ? 0 : firstNonZero + 1;
  };

  const floorToDecimal = (value: number, decimal: number) => {
    const factor = Math.pow(10, decimal);
    return Math.floor(value * factor) / factor;
  };
  const roudToNearest = (value: number) => {
    if (value < 1) {
      return floorToDecimal(value, decimalPlace(value) + 1);
    }

    if (value < 10) {
      return floorToDecimal(value, 1);
    }
    const rounded = Math.round(value);

    if (value > 100000) {
      return rounded - (rounded % 10000);
    }

    if (value > 10000) {
      return rounded - (rounded % 1000);
    }

    if (value > 1000) {
      return rounded - (rounded % 100);
    }

    if (value > 100) {
      return rounded - (rounded % 10);
    }

    return rounded;
  };
  useEffect(() => {
    const abort = new AbortController();
    async function fetchCoinDetail() {
      setIsLoading(true);
      const data = await axios<CoinDetail>(`/api/coins/${coinId}`, {
        signal: abort.signal,
      });
      setCoinDetail(data.data);
      setIsLoading(false);
    }

    async function fetchOhlc() {
      const data = await axios(`/api/coins/${coinId}/ohlc`, {
        params: {
          days: 7,
        },
        signal: abort.signal,
      });

      const echartOptions: EChartsOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: {
          type: "time",
          name: "Date",
        },
        yAxis: {
          type: "value",
          min: (value) => roudToNearest(value.min),
          name: "Price (USD)",
        },
        series: [
          {
            type: "candlestick",
            data: data.data,
            encode: {
              x: 0,
              y: [1, 4, 3, 2],
              tooltip: [1, 4, 3, 2],
            },
          },
        ],
      };

      setEchartOptions(echartOptions);
    }

    void fetchCoinDetail();
    void fetchOhlc();
    return () => abort.abort();
  }, [coinId]);

  return (
    <>
      <div>
        {!canRenderCoin ? (
          "Loading..."
        ) : (
          <div>
            <div>{`${coinDetail?.name} (${coinDetail?.symbol})`}</div>
            <div>{coinDetail.description?.en}</div>
            <EchartWrapper options={echartOptions}></EchartWrapper>
          </div>
        )}
      </div>
    </>
  );
}
