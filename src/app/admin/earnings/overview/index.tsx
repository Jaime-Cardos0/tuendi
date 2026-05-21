"use client";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Stack, Text } from "@chakra-ui/react";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import { EarningsTable } from "./Table";
import { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { EarningsContext } from "@/contexts/EarningsContext";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RiMoneyDollarCircleFill, RiProgress3Fill, RiProgress2Fill, RiCheckFill } from "react-icons/ri";
import { EarningsBarChartOptions } from "@/styles/chartsConfig";

export function MainEarnings() {

  const { subscricoes, receitaTotal, receitaSemanal, receitaMensal, activasCount, receitaPorMes } = useContext(EarningsContext);

  return (
    <Box as="main" w="100%" display="flex" flexDirection="column" gap={6} ml={52} mt={20}>

      <Stack alignSelf={"flex-start"}>
        <Text lineHeight={1} fontSize={"3xl"} fontWeight={"thin"} color={"text.primary"} letterSpacing={"normal"}>Ganhos</Text>

        <Breadcrumb spacing='8px' separator={<MdOutlineKeyboardDoubleArrowRight color='gray.500' />}>
          <BreadcrumbItem>
            <BreadcrumbLink fontSize={"xs"} fontWeight={"hairline"} color={"text.primary"} letterSpacing={"wide"} textTransform={"uppercase"} href='#'>Main Admin</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink fontWeight={"normal"} letterSpacing={"spaced"} textAlign={"end"} href='/admin/earnings'>Ganhos</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>

      {/* Cards */}
      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard
          icon={<RiMoneyDollarCircleFill size={"sm"} color="text.secondary"/> }
          title="Receita Total"
          value={`${receitaTotal.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          icon={<RiProgress3Fill size={"sm"} color="text.secondary"/> }
          title="Planos Semanais"
          value={`${receitaSemanal.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          icon={<RiProgress2Fill size={"sm"}/> }
          title="Planos Mensais"
          value={`${receitaMensal.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          icon={<RiCheckFill size={"sm"}/> }
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
          options={EarningsBarChartOptions}
          series={[{ name: "Receita", data: receitaPorMes }]}
          height={300}
        />
      </Box>

      {/* Tabela */}
      <EarningsTable />
    </Box>
  );
}