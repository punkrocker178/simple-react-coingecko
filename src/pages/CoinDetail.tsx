import { EchartWrapper } from "@/components/chart/echart-wrapper";
import type {
  CoinDetail,
  CoinGeckoOhlcResponse,
} from "@/models/coin-gecko";
import type { EChartsOption, SeriesOption } from "echarts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
  getCoinDetail,
  getCoinMarketChart,
  getCoinOhlc,
} from "@/services/coin-service";

export function CoinDetail() {
  const { id: coinId } = useParams();
  const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [echartOptions, setEchartOptions] = useState<EChartsOption | undefined>(
    undefined,
  );
  const [chartType, setChartType] = useState<"candlestick" | "line">("candlestick");
  const canRenderCoin = !isLoading && !!coinDetail;

  async function fetchCoinDetail(abort: AbortController) {
    setIsLoading(true);
    setCoinDetail(await getCoinDetail(coinId ?? "", abort.signal));
    setIsLoading(false);
  }

  async function fetchOhlc(abort: AbortController) {
    const data = await getCoinOhlc(coinId ?? "", 7, abort.signal);

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
      series: setupSeriesForCandlesticks(data) as SeriesOption[],
    };
    setEchartOptions(echartOptions);
  }

  async function fetchMarket(abort: AbortController) {
    const response = await getCoinMarketChart(coinId ?? "", 7, abort.signal);

    const source = response.prices.map(([timestamp, price], index) => [
      timestamp,
      price,
      response.market_caps[index]?.[1] ?? null,
      response.total_volumes[index]?.[1] ?? null,
    ]);

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
      legend: {},
      yAxis: [
        { type: "value", name: "Price (USD)", position: "left" },
        // { type: "value", name: "Market cap (USD)", position: "right" },
        {
          type: "value",
          name: "Volume (USD)",
          position: "right",
        //   offset: 80,
        },
      ],
      dataset: {
        dimensions: ["timestamp", "price", "marketCap", "volume"],
        source,
      },
      series: setupSeriesForLine(),
    };

    setEchartOptions(echartOptions);
  }

  useEffect(() => {
    const abortController = new AbortController();
    void fetchCoinDetail(abortController);
    return () => abortController.abort();
  }, [coinId]);

  useEffect(() => {
    const abortController = new AbortController();
    if (chartType === "candlestick") {
      void fetchOhlc(abortController);
    } else {
      void fetchMarket(abortController);
    }
    return () => abortController.abort();
  }, [chartType]);

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

  const changeChartType = (type: "candlestick" | "line") => {
    if (!echartOptions) return;

    if (type === "candlestick") {
      setChartType("candlestick");
    } else {
      setChartType("line");
    }
  };

  const setupSeriesForCandlesticks = (data: CoinGeckoOhlcResponse): SeriesOption[] => {
    return [
      {
        type: "candlestick",
        data: data,
        encode: {
          x: 0,
          y: [1, 4, 3, 2],
          tooltip: [1, 4, 3, 2],
        },
      },
    ];
  };

  const setupSeriesForLine = (): SeriesOption[] => {
    return [
      {
        name: "Price",
        type: "line",
        showSymbol: false,
        yAxisIndex: 0,
        encode: { x: "timestamp", y: "price", tooltip: ["timestamp", "price"] },
      },
    //   {
    //     name: "Market cap",
    //     type: "line",
    //     yAxisIndex: 1,
    //     encode: {
    //       x: "timestamp",
    //       y: "marketCap",
    //       tooltip: ["timestamp", "marketCap"],
    //     },
    //   },
      {
        name: "Volume",
        type: "bar",
        yAxisIndex: 1,
        encode: { x: "timestamp", y: "volume", tooltip: ["timestamp", "volume"] },
      },
    ];
  };

  return (
    <section className="space-y-4 sm:space-y-6">
      {!canRenderCoin ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm sm:p-6">
          Loading...
        </div>
      ) : (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <header className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Asset Details
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {`${coinDetail?.name} (${coinDetail?.symbol})`}
            </h1>
          </header>

          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <ButtonGroup className="flex-wrap">
                <Button onClick={() => changeChartType("candlestick")}>
                  Candlesticks
                </Button>
                <Button onClick={() => changeChartType("line")}>Line</Button>
              </ButtonGroup>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
              <div className="mb-3 text-sm leading-6 text-slate-600">
                {coinDetail.description?.en}
              </div>
              <EchartWrapper options={echartOptions} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
