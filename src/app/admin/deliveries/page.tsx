import { Header } from "@/components/UI/Header";
import { Sidebar } from "@/components/UI/Sidebar";
import { Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import { MainDelivery } from ".";
import { DeliveriesProvider } from "@/contexts/DeliveriesContext";

export const metadata: Metadata = { title: "Baza | Entregas" }

export default function DeliverPage(){
    return(
        <Flex direction={"column"} h={"100vh"}>
            <Header/>

            <Flex w={"100%"} maxW={"1440px"} my={6} mx={"auto"} px={8}>
                <Sidebar/>
                <DeliveriesProvider>
                    <MainDelivery />
                </DeliveriesProvider>
            </Flex>
        </Flex>
    );
}