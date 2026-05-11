import { Header } from "@/components/UI/Header";
import { MainDashboard } from "@/app/admin/dashboard";
import { Sidebar } from "@/components/UI/Sidebar";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { Flex } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Baza | DashBoard" };

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" maxW="1440px" my={6} mx="auto" px={8}>
        <Sidebar />
        <DashboardProvider>
          <MainDashboard />
        </DashboardProvider>
      </Flex>
    </Flex>
  );
}