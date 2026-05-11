import { Header } from "@/components/UI/Header";
import { Sidebar } from "@/components/UI/Sidebar";
import { Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import { MainEarnings } from ".";
import { EarningsProvider } from "@/contexts/EarningsContext";

export const metadata: Metadata = { title: "Baza | Ganhos" }

export default function UserPage(){
    return(
        <Flex direction={"column"} h={"100vh"}>
            <Header/>

            <Flex w={"100%"} maxW={"1440px"} my={6} mx={"auto"} px={8}>
                <Sidebar/>
                <EarningsProvider>
                    <MainEarnings />
                </EarningsProvider>
            </Flex>
        </Flex>
    );
}