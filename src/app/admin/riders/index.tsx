"use client";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import BarChart, { ClockIcon } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";
import { RidersTable } from "./Table";
import { RidersContext } from "@/contexts/RidersContext";
import { useContext, useMemo } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { FaUserTag, FaCheckSquare } from "react-icons/fa";
import { RiProgress3Fill, RiCloseCircleFill } from "react-icons/ri";

export function MainRider() {
  const {total, pendentes, ativos, suspensos} = useContext(RidersContext);

  const chartData = useMemo(() => [total, ativos, suspensos], [total, ativos, suspensos]);

  return (
    <Box as="main" w="100%" display="flex" flexDirection="column" gap={12} ml={52} mt={20}>

      <Breadcrumb spacing='8px' separator={<MdOutlineKeyboardDoubleArrowRight color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink fontSize={"xs"} fontWeight={"hairline"} color={"text.primary"} letterSpacing={"wide"} textTransform={"uppercase"} href='#'>Main Admin</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink fontWeight={"normal"} letterSpacing={"spaced"} textAlign={"end"} href='/admin/riders'>Riders</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>


      <Flex w="100%" justify="space-between" h="fit-content" gap={4}>
        <ResumeCard
          icon={<FaUserTag />}
          title="Total de Riders"
          value={total}
        />
        <ResumeCard
          icon={<RiProgress3Fill />}
          title="Pendentes"
          value={pendentes}
        />
        <ResumeCard icon={<FaCheckSquare />} title="Activos" value={ativos} />
        <ResumeCard icon={<RiCloseCircleFill />} title="Suspensos" value={suspensos} />
      </Flex>

      <RidersTable />
    </Box>
  );
}