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


// Dashboard

export const barOptions: ApexOptions = {
    ...baseChartOptions(theme.colors.brand[500]),
    chart: {
      ...baseChartOptions(theme.colors.brand[500]).chart,
      id: "receita-bar",
      type: "bar",
    },
    stroke: { width: 0},
    plotOptions: { bar: { borderRadius: 6, columnWidth: "70%" } },
    yaxis: {
      show: true,
      labels: {
        show: true,
        style: { colors: "#718096" },
        formatter: (v) => `${v.toLocaleString("pt-AO")} Kz`,
      },
    },
    fill: { type: "gradient", gradient: { shade: "dark", type: "vertical"} },
};

export const areaOptions: ApexOptions = {
    ...baseChartOptions(theme.colors.brand[500]),
    chart: {
      ...baseChartOptions(theme.colors.brand[500]).chart,
      id: "entregas-area",
      type: "area",
    },
    fill: { type: "gradient", gradient: { shade: "dark", type: "vertical", opacityFrom: 0.6, opacityTo: 0 } },
};

export const radialBarOptions: ApexOptions = {
    chart: {
    type: "radialBar",
    background: "transparent",
    toolbar: { show: false },
    },
    theme: { mode: "dark" },
    plotOptions: {
    radialBar: {
        startAngle: -90,
        // endAngle: 90,
        hollow: { size: "60%" },
        track: { background: "transparent" },
        dataLabels: {
        name: { fontSize: "12px", color: "#AEB9E1" },
        value: { fontSize: "14px", fontWeight: "bold", color: "#E8EAFF" },
        },
    },
    },
    labels: ["Concluídas", "Em andamento", "Canceladas"],
    colors: ["#C026D3", "#3B82F6", "#00d5ff"],
    legend: {
    show: true,
    position: "bottom",
    labels: { colors: "#8B90B8", },
    markers: { size: 6, shape: "circle", strokeWidth: 0, fillColors: ["#C026D3", "#3B82F6", "#00d5ff"] },
    },
}

// Dashboard****

// Earnings****

export const EarningsBarChartOptions: ApexOptions = {
  ...baseChartOptions("#00B5D8"),
    chart: { 
      ...baseChartOptions("#00B5D8").chart,
      id: "Receitas-Mensais",
      type: "bar", 
    },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "50%" } },
    stroke: { curve: "smooth", width: 0},
    yaxis: {
      labels: {
        style: { colors: "#718096" },
        formatter: (v) => `${v.toLocaleString("pt-AO")} Kz`,
      },
    },
    fill: { type: "gradient", gradient: { shade: "dark", type: "vertical" } },
    colors: ["#00B5D8"],
    grid: { borderColor: "#2D3748" },
    tooltip: {
      theme: "dark",
      y: { formatter: (v) => `${v.toLocaleString("pt-AO")} Kz` },
    },
  };

  // Earnings****