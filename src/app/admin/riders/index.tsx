"use client";
import { Box, Flex } from "@chakra-ui/react";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import BarChart, { ClockIcon } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";
import { RidersTable } from "./Table";
import { RidersContext } from "@/contexts/RidersContext";
import { useContext, useMemo } from "react";

export function MainRider() {
  const {total, pendentes, ativos, suspensos} = useContext(RidersContext);

  const chartData = useMemo(() => [total, ativos, suspensos], [total, ativos, suspensos]);

  return (
    <Box as="main" w="100%" display="flex" flexDirection="column" gap={12} ml={52} mt={20}>
      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard
          icon={<BarChart data={chartData ?? [0, 0, 0, 0]} max={total ?? 0} />}
          title="Total de Riders"
          value={total}
        />
        <ResumeCard
          title="Pendentes"
          value={pendentes}
        />
        <ResumeCard title="Activos" value={ativos} />
        <ResumeCard title="Suspensos" value={suspensos} />
      </Flex>

      <RidersTable />
    </Box>
  );
}