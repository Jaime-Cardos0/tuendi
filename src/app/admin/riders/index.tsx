"use client";
import { Box, Flex } from "@chakra-ui/react";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import { BarChartIcon, ClockIcon } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";
import { RidersTable } from "./Table";
import { useEffect } from "react";

export function MainRider() {
  return (
    <Box as="main" w="100%" display="flex" flexDirection="column" gap={12} ml={52} mt={20}>
      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard icon={<BarChartIcon />} title="Total de Riders" value={0} />
        <ResumeCard icon={<ClockIcon boxSize="56px" rounded="full" bgImage={gradients.primary} p="14px" />} title="Pendentes" value={0} />
        <ResumeCard title="Aprovados" value={0} />
        <ResumeCard title="Recusados" value={0} bgVariant="gradient" />
      </Flex>

      <RidersTable />
    </Box>
  );
}