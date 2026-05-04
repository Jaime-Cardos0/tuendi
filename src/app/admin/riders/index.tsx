"use client";
import { Box, Flex } from "@chakra-ui/react";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import BarChart, { ClockIcon } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";
import { RidersTable } from "./Table";
import { RidersContext } from "@/contexts/RidersContext";
import { useContext, useMemo } from "react";

export function MainRider() {
  const { riders } = useContext(RidersContext);

  const total = riders.length;
  const pendentes = useMemo(() => riders.filter(r => r.status === "pendente_aprovacao").length, [riders]);
  const activos = useMemo(() => riders.filter(r => r.status === "activo").length, [riders]);
  const suspensos = useMemo(() => riders.filter(r => r.status === "suspenso").length, [riders]);

  const chartData = useMemo(() => [total, pendentes, activos, suspensos], [total, pendentes, activos, suspensos]);

  return (
    <Box as="main" w="100%" display="flex" flexDirection="column" gap={12} ml={52} mt={20}>
      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard
          icon={<BarChart data={chartData} max={total} />}
          title="Total de Riders"
          value={total}
        />
        <ResumeCard
          title="Pendentes"
          value={pendentes}
        />
        <ResumeCard title="Activos" value={activos} />
        <ResumeCard title="Suspensos" value={suspensos} />
      </Flex>

      <RidersTable />
    </Box>
  );
}