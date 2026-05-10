import { theme } from "@/styles/theme";
import { ApexOptions } from "apexcharts";

export const baseChartOptions = (cor: string): ApexOptions => ({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    background: "transparent",
    width: "100%",
  },
  theme: { mode: "dark" },
  grid: { show: false },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 2 },
  yaxis: { show: false },
  xaxis: {
    categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: "#718096", fontSize: "11px" } },
  },
  colors: [cor],
  tooltip: { theme: "dark" },
});

export const barOptions: ApexOptions = {
    ...baseChartOptions(theme.colors.brand[500]),
    chart: {
      ...baseChartOptions(theme.colors.brand[500]).chart,
      id: "receita-bar",
      type: "bar",
    },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "70%" } },
    yaxis: {
      show: true,
      labels: {
        style: { colors: "#718096" },
        formatter: (v) => `${(v / 1000).toFixed(0)}k`,
      },
    },
};

export const areaOptions: ApexOptions = {
    ...baseChartOptions(theme.colors.brand[500]),
    chart: {
      ...baseChartOptions(theme.colors.brand[500]).chart,
      id: "entregas-area",
      type: "area",
    },
    fill: { type: "gradient", gradient: { shade: "dark", type: "vertical", opacityFrom: 0.4, opacityTo: 0 } },
};