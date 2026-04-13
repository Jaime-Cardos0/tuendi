"use client"
import { Box, Flex, Grid, GridItem, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { RiFilter3Line, RiRectangleLine } from "react-icons/ri";
import Chart from "react-apexcharts";
import { ResumeComponent } from "../../../components/UI/DataResume";
import { TableContainer } from "../../../components/UI/Table";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import { BarChartIcon, ClockIcon } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";
import { DashboardCard } from "./DashboardCard";

const state = {
    options: {
        chart: {
            id: "basic-bar",
            troke:{
                curve: "smooth"
            }
        },
        xaxis: {
            categories: [1991, 1999, 2000, 2006, 2008, 2010, 2012, 2015, 2020]
        }
    },
    series: [
        {
            name: "series-1",
            data: [30, 40, 35, 60, 74, 22, 43, 90, 15]
        }
    ]
}

export function MainDashboard(){
    return(
        <Box as="main" w={"100%"} display={"flex"} flexDirection={"column"} gap={12} ml={52} mt={20}>
            
            <Flex w={"100%"} justify={"space-between"} h={"fit-content"} gap={4}>
                <ResumeCard icon={<BarChartIcon/>} title="Entregas" value={682}/>
                <ResumeCard icon={<ClockIcon boxSize={"56px"} rounded={"full"} bgImage={gradients.primary} p={"14px"}/>} title="Bazando" value={682}/>
                <ResumeCard title="Receita" value={682} pathColor="#2563EB"/>
                <ResumeCard title="Fatura" value={682} bgVariant="gradient" pathColor="#EEF2FF"/>
            </Flex>

            <Grid templateColumns={"repeat(3, 1fr)"} gap={8} templateRows={"repeat(2, minmax(300px, 360px))"}>
                
                <GridItem colSpan={2}>

                    <DashboardCard title="Fatura" value={1000000.00}>
                        <Chart options={state.options} series={state.series} type="bar" width={"630px"} height={"240px"}/>
                    </DashboardCard>
                    
                </GridItem>
                
                <GridItem>

                    <DashboardCard title="Fatura" value={682}>
                        <Chart options={state.options} series={state.series} type="area" height={"140px"}/>
                    </DashboardCard>

                </GridItem>

                <GridItem>

                    <DashboardCard title="Entregas" value={900}>
                        <Chart options={state.options} series={state.series} type="area" height={"140px"}/>
                    </DashboardCard>

                </GridItem>

                <GridItem>

                    <DashboardCard title="Melhores Avaliados" value={900}>
                        <RiRectangleLine size={160}/>
                    </DashboardCard>

                </GridItem>

                <GridItem>

                    <DashboardCard title="Parceiros Ativos" value={900}>
                        <RiRectangleLine size={160}/>
                    </DashboardCard>

                </GridItem>

            </Grid>

            <TableContainer/>
        </Box>
    );
}