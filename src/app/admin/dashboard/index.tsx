"use client"
import { Box, Flex, Grid, GridItem} from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { TableDashboard } from "./Table";
import { ResumeCard } from "@/components/UI/DataResume/ResumeCard";
import { BarChartIcon, ClockIcon, LineChartPurple, LineChartWhite } from "@/components/Icons/icons";
import { gradients } from "@/styles/gradients";
import { DashboardCard } from "./DashboardCard";
import { TopRatedList } from "./TopRatedList";
import { theme } from "@/styles/theme";
import { useEffect } from "react";

const state = {
    options: {
        chart: {
            id: "basic-bar",
            stroke:{
                curve: "smooth", 
                colors: theme.colors.brand[500],
                lineCap: "round",
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            }
        },

        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false
        },
        // tooltip: {
        //     enabled: false,
        // },
        yaxis: {
            show: false,
        },
        xaxis: {
            categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                color: theme.colors.grayDark[700]
            }
        }
    },
    series: [
        {
            name: "series-1",
            data: [30, 40, 35, 60, 74, 22, 43, 90, 15, 67, 55, 43]
        }
    ]
}

const areaState = {
    options: {
        chart: {
            id: "basic-area",
            width: "100%",
            height: "100%",
            stroke:{
                curve: "smooth", 
                colors: theme.colors.brand[500],
                lineCap: "round",
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            }
        },

        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false
        },
        // tooltip: {
        //     enabled: false,
        // },
        yaxis: {
            show: false,
        },
        xaxis: {
            categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                color: theme.colors.grayDark[700]
            }
        }
    },
    series: [
        {
            name: "series-1",
            data: [30, 40, 35, 60, 74, 22, 43, 90, 15, 67, 55, 43]
        }
    ]
}


export function MainDashboard(){

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
        .then((response) => response.json())
        .then((data) => console.log(data));
    }, []);

    return(
        <Box as="main" w={"100%"} display={"flex"} flexDirection={"column"} gap={12} ml={52} mt={20}>
            
            <Flex w={"100%"} justify={"space-between"} h={"fit-content"} gap={4}>
                <ResumeCard icon={<BarChartIcon/>} title="Entregas" value={682}/>
                <ResumeCard icon={<ClockIcon boxSize={"56px"} rounded={"full"} bgImage={gradients.primary} p={"14px"}/>} title="Bazando" value={682}/>
                <ResumeCard icon={<LineChartPurple/>} title="Receita" value={682} />
                <ResumeCard icon={<LineChartWhite/>} title="Fatura" value={682} bgVariant="gradient" />
            </Flex>

            <Grid templateColumns={"repeat(3, 1fr)"} gap={8} templateRows={"repeat(2, minmax(300px, 360px))"}>
                
                <GridItem colSpan={2}>

                    <DashboardCard title="Fatura" value={1000000.00}>
                        <Chart options={state.options} series={state.series} type="bar" width={"630px"} height={"240px"}/>
                    </DashboardCard>
                    
                </GridItem>
                
                <GridItem>

                    <DashboardCard title="Fatura" value={682}>
                        <Chart options={areaState.options} series={areaState.series} type="area" height={"140px"}/>
                    </DashboardCard>

                </GridItem>

                <GridItem>

                    <DashboardCard title="Entregas" value={900}>
                        <Chart options={areaState.options} series={areaState.series} type="area" height={"140px"}/>
                    </DashboardCard>

                </GridItem>

                <GridItem>

                    <DashboardCard title="Melhores Avaliados">
                        <TopRatedList data={[{id:1, name: "Carlos Santos", role: "Driver 16h", score: 50}, {id:2, name: "Aldemaro Miguel", role: "Driver 1h", score: -2}]}/>
                    </DashboardCard>

                </GridItem>

                <GridItem>

                    <DashboardCard title="Melhores Avaliados">
                        <TopRatedList data={[{id:1, name: "Courtney Henry", role: "15 orders", score: 50}, {id:2, name: "Alissar Bell", role: "13 orders", score: 45}]}/>
                    </DashboardCard>

                </GridItem>

            </Grid>

            <TableDashboard/>
        </Box>
    );
}