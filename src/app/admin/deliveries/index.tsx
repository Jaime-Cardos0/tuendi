"use client";
import { Box, Flex } from "@chakra-ui/react";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import BarChart, { ClockIcon } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";
import { DeliveriesTable } from "./Table";
import { useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";
import { IPedido } from "@/services/mirage/types";
import { DeliveriesContext } from "@/contexts/DeliveriesContext";

export function MainDelivery() {
  const { pedidos, total, emTransito, entregues, cancelados } = useContext(DeliveriesContext);

  const chartData = useMemo(
    () => [total, emTransito, entregues, cancelados],
    [total, emTransito, entregues, cancelados]
  );

  return (
    <Box as="main" w="100%" display="flex" flexDirection="column" gap={12} ml={52} mt={20}>
      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard
          icon={<BarChart data={chartData ?? [0, 0, 0, 0]} max={chartData.length ?? 0} />}
          title="Total de Pedidos"
          value={total}
        />
        <ResumeCard
          title="Em Trânsito"
          value={emTransito}
        />
        <ResumeCard title="Entregues" value={entregues} />
        <ResumeCard title="Cancelados" value={cancelados} bgVariant="gradient" />
      </Flex>

      <DeliveriesTable />
    </Box>
  );
}