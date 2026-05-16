"use client";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { DashboardTable } from "./Table";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import BarChart from "@/components/Icons/icons";
import { DashboardCard } from "./DashboardCard";
import { TopRatedList, User } from "./TopRatedList";
import { useContext, useMemo } from "react";
import { IPedido, IUser } from "@/services/mirage/types";
import { ApexOptions } from "apexcharts";
import { barOptions, areaOptions, radialBarOptions } from "./chartsConfig";
import { DashboardContext } from "@/contexts/DashboardContext";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { BsBox, BsBoxFill } from "react-icons/bs";
import { FaFileInvoice, FaFileInvoiceDollar } from "react-icons/fa";
import { RiProgress3Fill, RiMoneyDollarCircleFill } from "react-icons/ri";

export function MainDashboard() {

  const { receitaPorMes, entregasPorMes, pedidos, motoqueiros, clientes } = useContext(DashboardContext);

  // Cards
  const totalPedidos   = useMemo(() => pedidos.filter((p) => p.status === "entregue").length, [pedidos]);
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
      .slice(0, 5)
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
      .slice(0, 5)
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

  return (
    <Box as="main" w="100%" display="flex" flexDirection="column" gap={6} ml={52} mt={20}>

      <Stack alignSelf={"flex-start"}>
        <Text lineHeight={1} fontSize={"3xl"} fontWeight={"thin"} color={"text.primary"} letterSpacing={"normal"}>Dashboard</Text>

        <Breadcrumb spacing='8px' separator={<MdOutlineKeyboardDoubleArrowRight color='gray.500' />}>
          <BreadcrumbItem>
            <BreadcrumbLink fontSize={"xs"} fontWeight={"hairline"} color={"text.primary"} letterSpacing={"wide"} textTransform={"uppercase"} href='#'>Main Admin</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink fontWeight={"normal"} letterSpacing={"spaced"} textAlign={"end"} href='/admin/dashboard'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>

      {/* Cards de resumo */}
      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard
          icon={<BsBoxFill size={"sm"} color="text.secondary"/>}
          title="Entregas hoje"
          value={totalPedidos}
          percentage={10}
        />
        <ResumeCard
          icon={<RiProgress3Fill size={"sm"} color="text.secondary"/>}
          title="Em andamento"
          value={emAndamento}
          percentage={-5}
        />
        <ResumeCard
          icon={<RiMoneyDollarCircleFill size={"sm"} color="text.secondary"/>}
          title="Receita"
          value={`${receita.toLocaleString("pt-AO")} Kz`}
        />
        <ResumeCard
          icon={<FaFileInvoiceDollar size={"sm"} />}
          title="Fatura"
          value={`${fatura.toLocaleString("pt-AO")} Kz`}
          bgVariant="gradient"
        />
      </Flex>

      {/* Grid de cards */}
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
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
            options={radialBarOptions}
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
          <DashboardCard title="Entregas" value={totalPedidos} isBalance={false} >
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
      <DashboardTable />

    </Box>
  );
}