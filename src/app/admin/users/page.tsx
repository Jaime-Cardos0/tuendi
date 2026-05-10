import { Header } from "@/components/UI/Header";
import { Sidebar } from "@/components/UI/Sidebar";
import { Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import { MainUser } from ".";
import { UsersProvider } from "@/contexts/UsersContext";

export const metadata: Metadata = { title: "Baza | Usuarios" }

export default function UserPage(){
    return(
        <Flex direction={"column"} h={"100vh"}>
            <Header/>

            <Flex w={"100%"} maxW={"1440px"} my={6} mx={"auto"} px={8}>
                <Sidebar/>
                <UsersProvider>
                    <MainUser/>
                </UsersProvider>
            </Flex>
        </Flex>
    );
}