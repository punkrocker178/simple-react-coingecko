import * as echarts from "echarts/core";
import { BarChart, LineChart, CandlestickChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  LineChart,
  CandlestickChart,
  CanvasRenderer,
  UniversalTransition,
]);

export default echarts;