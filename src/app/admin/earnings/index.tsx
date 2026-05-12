"use client";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from "@chakra-ui/react";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import { EarningsTable } from "./Table";
import { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { EarningsContext } from "@/contexts/EarningsContext";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RiMoneyDollarCircleFill, RiProgress3Fill, RiProgress2Fill, RiCheckFill } from "react-icons/ri";

export function MainEarnings() {

  const { subscricoes, receitaTotal, receitaSemanal, receitaMensal, activasCount, receitaPorMes } = useContext(EarningsContext);

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

      <Breadcrumb spacing='8px' separator={<MdOutlineKeyboardDoubleArrowRight color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink fontSize={"xs"} fontWeight={"hairline"} color={"text.primary"} letterSpacing={"wide"} textTransform={"uppercase"} href='#'>Main Admin</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink fontWeight={"normal"} letterSpacing={"spaced"} textAlign={"end"} href='/admin/earnings'>Ganhos</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Cards */}
      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard
          icon={<RiMoneyDollarCircleFill />}
          title="Receita Total"
          value={`${receitaTotal.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          icon={<RiProgress3Fill />}
          title="Planos Semanais"
          value={`${receitaSemanal.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          icon={<RiProgress2Fill />}
          title="Planos Mensais"
          value={`${receitaMensal.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          icon={<RiCheckFill />}
          title="Subscrições Activas"
          value={activasCount}
          bgVariant="gradient"
        />
      </Flex>

      {/* Gráfico */}
      <Box bg="bg.card" border="2px" borderColor="border.default" rounded="lg" p={6}>
        
        <Text fontWeight="bold" fontSize="lg" mb={6}>Receita por Mês</Text>
        <ReactApexChart
          type="bar"
          options={chartOptions}
          series={chartData}
          height={300}
        />
      </Box>

      {/* Tabela */}
      <EarningsTable />
    </Box>
  );
}