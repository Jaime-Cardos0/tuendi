"use client";
import { Box, Flex } from "@chakra-ui/react";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import BarChart, { ClockIcon } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";
import { UsersTable } from "./Table";
import { useContext, useMemo } from "react";
import { UsersContext } from "@/contexts/UsersContext";

export function MainUser() {
  const {total, clientes, motoqueiroCount, suspensos} = useContext(UsersContext);

  const chartData = useMemo(
    () => [total, clientes, motoqueiroCount, suspensos],
    [total, clientes, motoqueiroCount, suspensos]
  );

  return (
    <Box as="main" w="100%" display="flex" flexDirection="column" gap={12} ml={52} mt={20}>
      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard
          icon={<BarChart data={chartData} max={total} />}
          title="Total de Usuários"
          value={total}
        />
        <ResumeCard
          title="Clientes"
          value={clientes}
        />
        <ResumeCard title="Motoqueiros" value={motoqueiroCount} />
        <ResumeCard title="Suspensos" value={suspensos} bgVariant="gradient" />
      </Flex>

      <UsersTable />
    </Box>
  );
}