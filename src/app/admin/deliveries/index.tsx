"use client"
import { Box, Flex } from "@chakra-ui/react";
import { ResumeComponent } from "../../../components/UI/DataResume";
import { TableContainer } from "../../../components/UI/Table";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import { BarChartIcon, ClockIcon } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";

export function MainDeliver(){
    return(
        <Box as="main" w={"100%"} display={"flex"} flexDirection={"column"} gap={12} ml={52} mt={20}>
            
            <Flex w={"100%"} justify={"space-between"} h={"fit-content"} gap={4}>
                <ResumeCard icon={<BarChartIcon/>} title="Entregas" value={682}/>
                <ResumeCard icon={<ClockIcon boxSize={"56px"} rounded={"full"} bgImage={gradients.primary} p={"14px"}/>} title="Bazando" value={682}/>
                <ResumeCard title="Receita" value={682}/>
                <ResumeCard title="Fatura" value={682} bgVariant="gradient"/>
            </Flex>

            <TableContainer/>
        </Box>
    );
}