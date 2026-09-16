

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

  return options &&  Object.keys(options).length > 0 ? 
  <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div> : 
  <div>No data</div>;
}
