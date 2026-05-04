"use client";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { DashboardTable } from "./Table";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import BarChart, { ClockIcon, LineChartPurple, LineChartWhite } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";
import { DashboardCard } from "./DashboardCard";
import { TopRatedList } from "./TopRatedList";
import { theme } from "@/styles/theme";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";
import { IMotoqueiro, IPedido, IUser } from "@/services/mirage/types";
import { ApexOptions } from "apexcharts";

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function receitaPorMes(pedidos: IPedido[]) {
  const totais = Array(12).fill(0);
  pedidos
    .filter((p) => p.status === "entregue")
    .forEach((p) => {
      const mes = new Date(p.criadoEm).getMonth();
      totais[mes] += p.valorEntrega;
    });
  return totais;
}

function entregasPorMes(pedidos: IPedido[]) {
  const totais = Array(12).fill(0);
  pedidos
    .filter((p) => p.status === "entregue")
    .forEach((p) => {
      const mes = new Date(p.criadoEm).getMonth();
      totais[mes] += 1;
    });
  return totais;
}

const baseChartOptions = (cor: string): ApexOptions => ({
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
    categories: MESES,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: "#718096", fontSize: "11px" } },
  },
  colors: [cor],
  tooltip: { theme: "dark" },
});

export function MainDashboard() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [motoqueiros, setMotoqueiros] = useState<IMotoqueiro[]>([]);
  const [clientes, setClientes] = useState<IUser[]>([]);

  useEffect(() => {
    api.get("/pedidos").then((res) => setPedidos(res.data)).catch(console.error);
    api.get("/motoqueiros").then((res) => setMotoqueiros(res.data)).catch(console.error);
    api.get("/users").then((res) =>
      setClientes(res.data.filter((u: IUser) => u.role === "cliente"))
    ).catch(console.error);
  }, []);

  // Cards
  const totalEntregas   = useMemo(() => pedidos.filter((p) => p.status === "entregue").length, [pedidos]);
  const emAndamento     = useMemo(() => pedidos.filter((p) => p.status === "em_transito").length, [pedidos]);
  const receita         = useMemo(() => pedidos.filter((p) => p.status === "entregue").reduce((acc, p) => acc + p.valorEntrega, 0), [pedidos]);
  const fatura          = useMemo(() => pedidos.reduce((acc, p) => acc + p.valorEntrega, 0), [pedidos]);

  // Gráficos
  const dadosReceita   = useMemo(() => receitaPorMes(pedidos), [pedidos]);
  const dadosEntregas  = useMemo(() => entregasPorMes(pedidos), [pedidos]);

  // TopRated — motoqueiros ordenados por classificação
  const topMotoqueiros = useMemo(() =>
    [...motoqueiros]
      .sort((a, b) => b.classificacaoMedia - a.classificacaoMedia)
      .slice(0, 4)
      .map((m) => ({
        id: Number(m.id),
        name: `${m.user.nome} ${m.user.sobrenome}`,
        role: `${m.totalAvaliacoes} avaliações`,
        avatar: m.user.fotoPerfil,
        score: m.classificacaoMedia,
      })),
    [motoqueiros]
  );

  // TopRated — clientes com mais pedidos
  const topClientes = useMemo(() => {
    const contagem: Record<string, { user: IUser; total: number }> = {};
    pedidos.forEach((p) => {
      if (!contagem[p.clienteId]) {
        contagem[p.clienteId] = { user: p.cliente, total: 0 };
      }
      contagem[p.clienteId].total += 1;
    });
    return Object.values(contagem)
      .sort((a, b) => b.total - a.total)
      .slice(0, 4)
      .map((c) => ({
        id: Number(c.user.id),
        name: `${c.user.nome} ${c.user.sobrenome}`,
        role: `${c.total} pedidos`,
        avatar: c.user.fotoPerfil,
        score: c.total,
      }));
  }, [pedidos]);

  // Últimas entregas — 5 mais recentes
  const ultimasEntregas = useMemo(() =>
    [...pedidos]
      .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
      .slice(0, 5),
    [pedidos]
  );

  const barOptions: ApexOptions = {
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

  const areaOptions: ApexOptions = {
    ...baseChartOptions(theme.colors.brand[500]),
    chart: {
      ...baseChartOptions(theme.colors.brand[500]).chart,
      id: "entregas-area",
      type: "area",
    },
    fill: { type: "gradient", gradient: { shade: "dark", type: "vertical", opacityFrom: 0.4, opacityTo: 0 } },
  };

  return (
    <Box as="main" w="100%" display="flex" flexDirection="column" gap={12} ml={52} mt={20}>

      {/* Cards de resumo */}
      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard
          icon={<BarChart data={dadosEntregas} max={Math.max(...dadosEntregas, 1)} />}
          title="Entregas hoje"
          value={totalEntregas}
        />
        <ResumeCard
          title="Em andamento"
          value={emAndamento}
        />
        <ResumeCard
          title="Receita"
          value={`${receita.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          title="Fatura"
          value={`${fatura.toLocaleString("pt-AO")} Kz`}
          bgVariant="gradient"
        />
      </Flex>

      {/* Grid de cards */}
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={8}
        templateRows="repeat(2, minmax(300px, 360px))"
      >
        {/* Gráfico de barras — Fatura anual */}
        <GridItem colSpan={2}>
          <DashboardCard title="Total de Fatura" value={fatura}>
            <Chart
              options={barOptions}
              series={[{ name: "Receita", data: dadosReceita }]}
              type="bar"
              width="600px"
              height="240px"
            />
          </DashboardCard>
        </GridItem>

        {/* Semicírculo — estados das entregas */}
        <GridItem>
        <DashboardCard title="Estados das Entregas">
            <Chart
            options={{
                chart: {
                type: "radialBar",
                background: "transparent",
                toolbar: { show: false },
                },
                theme: { mode: "dark" },
                plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    hollow: { size: "40%" },
                    track: { background: "#333f55" },
                    dataLabels: {
                    name: { fontSize: "12px", color: "#718096" },
                    value: { fontSize: "16px", fontWeight: "bold", color: "#fff" },
                    },
                },
                },
                labels: ["Concluídas", "Em andamento", "Canceladas"],
                colors: ["#00B5D8", "#ECC94B", "#FC8181"],
                legend: {
                show: true,
                position: "bottom",
                labels: { colors: "#718096" },
                },
            }}
            series={[
                Math.round((pedidos.filter((p) => p.status === "entregue").length / Math.max(pedidos.length, 1)) * 100),
                Math.round((pedidos.filter((p) => p.status === "em_transito").length / Math.max(pedidos.length, 1)) * 100),
                Math.round((pedidos.filter((p) => p.status === "cancelado").length / Math.max(pedidos.length, 1)) * 100),
            ]}
            type="radialBar"
            width="100%"
            height="260px"
            />
        </DashboardCard>
        </GridItem>

        {/* Gráfico de area — segunda linha */}
        <GridItem>
          <DashboardCard title="Entregas" value={totalEntregas}>
            <Chart
              options={areaOptions}
              series={[{ name: "Entregas", data: dadosEntregas }]}
              type="area"
              width="100%"
              height="140px"
            />
          </DashboardCard>
        </GridItem>

        {/* Top motoqueiros */}
        <GridItem>
          <DashboardCard title="Melhores Avaliados">
            <TopRatedList data={topMotoqueiros} />
          </DashboardCard>
        </GridItem>

        {/* Top clientes */}
        <GridItem>
          <DashboardCard title="Parceiros Activos">
            <TopRatedList data={topClientes} />
          </DashboardCard>
        </GridItem>
      </Grid>

      {/* Últimas entregas */}
      <DashboardTable pedidos={ultimasEntregas} />

    </Box>
  );
}