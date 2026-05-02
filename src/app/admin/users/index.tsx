"use client";
import { Box, Flex } from "@chakra-ui/react";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import BarChart, { ClockIcon } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";
import { UsersTable } from "./Table";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";
import { IUser } from "@/services/mirage/types";

export function MainUser() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    api.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const total     = users.length;
  const clientes  = useMemo(() => users.filter((u) => u.role === "cliente").length, [users]);
  const motoqueiroCount = useMemo(() => users.filter((u) => u.role === "motoqueiro").length, [users]);
  const suspensos = useMemo(() => users.filter((u) => u.status === "suspenso").length, [users]);

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
          icon={<ClockIcon boxSize="56px" rounded="full" bgImage={gradients.primary} p="14px" />}
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