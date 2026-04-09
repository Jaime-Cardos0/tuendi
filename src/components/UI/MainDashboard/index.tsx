"use client"
import { Box, Flex, Grid, GridItem, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { RiFilter3Line, RiRectangleLine } from "react-icons/ri";
import Chart from "react-apexcharts";
import { ResumeComponent } from "../DataResume";
import { TableContainer } from "../Table";

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
            data: [30, 40, 35, 60, 74, 22, 43, 90, 10]
        }
    ]
}

export function MainDashboard(){
    return(
        <Box as="main" display={"flex"} flexDirection={"column"} gap={12} ml={52} mt={20}>
            
            <ResumeComponent />

            <Grid templateColumns={"repeat(3, 1fr)"} gap={8} templateRows={"repeat(2, minmax(300px, 360px))"}>
                
                <GridItem colSpan={2}>
                    <Flex w={"100%"} h={"100%"} direction={"column"} gap={2} rounded={"2xl"} px={8} py={8} bg={"bg.card"} justify={"space-between"} align={"center"}>
                        <Flex w={"100%"} h={"fit-content"} justify={"space-between"}>
                            <Stack align={"flex-start"} spacing={1}>

                                <Heading size={"sm"} color={"text.secondary"} letterSpacing={"wide"} fontWeight={"light"}>Fatura</Heading>
                                
                                <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                            </Stack>
                            <IconButton variant={"ghost"} aria-label="Filtros por data" fontSize={20} icon={<RiFilter3Line/>}/>
                        </Flex>
                        <Box>
                            <Chart options={state.options} series={state.series} type="bar" width={"630px"} height={"240px"}/>
                        </Box>
                    </Flex>
                    
                </GridItem>
                
                <GridItem>
                    <Flex w={"100%"} h={"100%"} direction={"column"} gap={2} rounded={"2xl"} px={8} py={8} bg={"bg.card"} justify={"space-between"} align={"center"}>
                        
                        <Box>
                            <Heading size={"sm"} color={"text.secondary"} letterSpacing={"wide"} fontWeight={"light"}>Entregas</Heading>
                            <Chart options={state.options} series={state.series} type="area" height={"140px"}/>
                        </Box>
                        <Flex w={"100%"} h={"fit-content"} justify={"space-between"}>
                            <Stack align={"flex-start"} spacing={1}>

                                <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sxs"} fontWeight={"normal"}>Fatura</Text>
                                
                                <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                            </Stack>
                            <RiRectangleLine size={80}/>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex w={"100%"} h={"100%"} direction={"column"} gap={2} rounded={"2xl"} px={8} py={8} bg={"bg.card"} justify={"space-between"} align={"center"}>
                        
                        <Box>
                            <Heading size={"sm"} color={"text.secondary"} letterSpacing={"wide"} fontWeight={"light"}>Entregas</Heading>
                            <RiRectangleLine size={160}/>
                        </Box>
                        <Flex w={"100%"} h={"fit-content"} justify={"space-between"}>
                            <Stack align={"flex-start"} spacing={1}>

                                <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sxs"} fontWeight={"normal"}>Fatura</Text>
                                
                                <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                            </Stack>
                            <RiRectangleLine size={80}/>
                        </Flex>
                    </Flex>
                </GridItem>

                <GridItem>
                    <Flex w={"100%"} h={"100%"} direction={"column"} gap={2} rounded={"2xl"} px={8} py={8} bg={"bg.card"} justify={"space-between"} align={"center"}>
                        
                        <Box>
                            <Heading size={"sm"} color={"text.secondary"} letterSpacing={"wide"} fontWeight={"light"}>Entregas</Heading>
                            <RiRectangleLine size={160}/>
                        </Box>
                        <Flex w={"100%"} h={"fit-content"} justify={"space-between"}>
                            <Stack align={"flex-start"} spacing={1}>

                                <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sxs"} fontWeight={"normal"}>Fatura</Text>
                                
                                <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                            </Stack>
                            <RiRectangleLine size={80}/>
                        </Flex>
                    </Flex>
                </GridItem>

                <GridItem>
                    <Flex w={"100%"} h={"100%"} direction={"column"} gap={2} rounded={"2xl"} px={8} py={8} bg={"bg.card"} justify={"space-between"} align={"center"}>
                        
                        <Box>
                            <Heading size={"sm"} color={"text.secondary"} letterSpacing={"wide"} fontWeight={"light"}>Entregas</Heading>
                            <RiRectangleLine size={160}/>
                        </Box>
                        <Flex w={"100%"} h={"fit-content"} justify={"space-between"}>
                            <Stack align={"flex-start"} spacing={1}>

                                <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sxs"} fontWeight={"normal"}>Fatura</Text>
                                
                                <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                            </Stack>
                            <RiRectangleLine size={80}/>
                        </Flex>
                    </Flex>
                </GridItem>

            </Grid>

            <TableContainer/>
        </Box>
    );
}