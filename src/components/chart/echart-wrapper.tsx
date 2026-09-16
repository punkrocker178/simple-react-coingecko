

import { useEffect, useRef } from "react";
import type { EChartsOption } from "echarts";

import echarts from "./echartsConfig";

export function EchartWrapper({ options }: { options?: EChartsOption }) {
  const chartRef = useRef<HTMLDivElement>(null);

  function initEchart() {
    
    if (chartRef.current && options && Object.keys(options).length > 0) {
      const chartInstance = echarts.init(chartRef.current);

      chartInstance.setOption(options);

      return chartInstance;
    }
  }

  useEffect(() => {
    const instance = initEchart();
    return () => instance?.dispose();
  }, [chartRef, options]);

  return options && Object.keys(options).length > 0 ? (
    <div
      ref={chartRef}
      className="h-[260px] w-full sm:h-[320px] lg:h-[400px]"
      style={{ width: "100%" }}
    />
  ) : (
    <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-100 text-sm text-slate-500 sm:h-[260px]">
      No data
    </div>
  );
}
