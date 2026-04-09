import { Header } from "@/components/UI/Header";
import { MainDashboard } from "@/components/UI/MainDashboard";
import { Sidebar } from "@/components/UI/Sidebar";
import { Flex } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Baza | DashBoard" }

export default function Dashboard(){
    return(
        <Flex direction={"column"} h={"100vh"}>
            <Header/>

            <Flex w={"100%"} maxW={"1440px"} my={6} mx={"auto"} px={8}>
                <Sidebar/>
                <MainDashboard/>
            </Flex>
        </Flex>
    );
}