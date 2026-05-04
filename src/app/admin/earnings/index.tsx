"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import { EarningsTable } from "./Table";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";
import { ISubscricao } from "@/services/mirage/types";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function gerarReceitaMensal(subscricoes: ISubscricao[]) {
  const meses = Array.from({ length: 12 }, (_, i) => ({
    mes: i,
    total: 0,
  }));

  subscricoes.forEach((s) => {
    const mes = new Date(s.criadoEm).getMonth();
    meses[mes].total += s.valor;
  });

  return meses.map((m) => m.total);
}

export function MainEarnings() {
  const [subscricoes, setSubscricoes] = useState<ISubscricao[]>([]);

  useEffect(() => {
    api.get("/subscricoes")
      .then((res) => setSubscricoes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const receitaTotal = useMemo(() =>
    subscricoes.reduce((acc, s) => acc + s.valor, 0),
    [subscricoes]
  );

  const receitaSemanal = useMemo(() =>
    subscricoes
      .filter((s) => s.plano === "semanal")
      .reduce((acc, s) => acc + s.valor, 0),
    [subscricoes]
  );

  const receitaMensal = useMemo(() =>
    subscricoes
      .filter((s) => s.plano === "mensal")
      .reduce((acc, s) => acc + s.valor, 0),
    [subscricoes]
  );

  const activasCount = useMemo(() =>
    subscricoes.filter((s) => s.status === "activa").length,
    [subscricoes]
  );

  const receitaPorMes = useMemo(() => gerarReceitaMensal(subscricoes), [subscricoes]);

  const chartOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false }, background: "transparent" },
    theme: { mode: "dark" },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "50%" } },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      labels: { style: { colors: "#718096" } },
    },
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

  const chartData = [{ name: "Receita", data: receitaPorMes }];

  return (
    <Box as="main" w="100%" display="flex" flexDirection="column" gap={12} ml={52} mt={20}>

      {/* Cards */}
      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard
          title="Receita Total"
          value={`${receitaTotal.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          title="Planos Semanais"
          value={`${receitaSemanal.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          title="Planos Mensais"
          value={`${receitaMensal.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          title="Subscrições Activas"
          value={activasCount}
          bgVariant="gradient"
        />
      </Flex>

      {/* Gráfico */}
      <Box bg="grayDark.700" border="2px" borderColor="grayDark.500" rounded="xl" p={6}>
        <Text fontWeight="bold" fontSize="lg" mb={6}>Receita por Mês</Text>
        <ReactApexChart
          type="bar"
          options={chartOptions}
          series={chartData}
          height={300}
        />
      </Box>

      {/* Tabela */}
      <EarningsTable subscricoes={subscricoes} />
    </Box>
  );
}