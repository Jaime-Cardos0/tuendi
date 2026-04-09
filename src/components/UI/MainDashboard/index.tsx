"use client"
import { Box, Button, ButtonGroup, ButtonSpinner, Flex, Grid, GridItem, Heading, IconButton, Stack, Table, Tag, TagLabel, TagLeftIcon, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill, RiFilter2Fill, RiFilter2Line, RiFilter3Fill, RiFilter3Line, RiFilterFill, RiFilterLine, RiRectangleLine } from "react-icons/ri";
import Chart from "react-apexcharts";
import { FaChartBar } from "react-icons/fa6";
import { CgChart } from "react-icons/cg";
import { BiBarChart, BiBarChartAlt, BiBarChartAlt2, BiBarChartSquare, BiChart, BiSolidBarChartAlt2 } from "react-icons/bi";

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
            <Flex w={"100%"} justify={"space-between"} h={"fit-content"} gap={4}>

                <Flex w={"100%"} maxW={"270px"} gap={12} rounded={"2xl"} px={6} py={2} bg={"bg.card"} justify={"space-between"} align={"center"}>
                    <Stack align={"flex-start"} spacing={1}>

                        <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sm"} fontWeight={"normal"}>Entregas</Text>
                        
                        <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                    </Stack>
                    <RiRectangleLine size={80}/>
                </Flex>

                <Flex w={"100%"} maxW={"270px"} gap={12} rounded={"2xl"} px={6} py={2} bg={"bg.card"} justify={"space-between"} align={"center"}>
                    <Stack align={"flex-start"} spacing={1}>

                        <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sm"} fontWeight={"normal"}>Bazando</Text>
                        
                        <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                    </Stack>
                    <RiRectangleLine size={80}/>
                </Flex>

                <Flex w={"100%"} maxW={"270px"} gap={12} rounded={"2xl"} px={6} py={2} bg={"bg.card"} justify={"space-between"} align={"center"}>
                    <Stack align={"flex-start"} spacing={1}>

                        <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sm"} fontWeight={"normal"}>Receita</Text>
                        
                        <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                    </Stack>
                    <RiRectangleLine size={80}/>
                </Flex>

                <Flex w={"100%"} maxW={"270px"} gap={12} rounded={"2xl"} px={6} py={2} bgImage={"linear(to-br, blueAccent.600, brand.600)"} justify={"space-between"} align={"center"}>
                    <Stack align={"flex-start"} spacing={1}>

                        <Text as={"h4"} color={"text.primary"} letterSpacing={"wide"} fontSize={"sm"} fontWeight={"normal"}>Fatura</Text>
                        
                        <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                    </Stack>
                    <RiRectangleLine size={80}/>
                </Flex>
            </Flex>

            <Grid templateColumns={"repeat(3, 1fr)"} gap={8} templateRows={"repeat(2, minmax(300px, 400px))"}>
                
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
{/* 
                <GridItem>
                    <Flex w={"100%"} h={"100%"} gap={12} rounded={"2xl"} px={6} py={2} bg={"bg.card"} justify={"space-between"} align={"center"}>
                        <Stack align={"flex-start"} spacing={1}>

                            <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sxs"} fontWeight={"extraLight"}>Fatura</Text>
                            
                            <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                        </Stack>
                        <RiRectangleLine size={80}/>
                    </Flex>
                </GridItem>

                <GridItem>
                    <Flex w={"100%"} h={"100%"} gap={12} rounded={"2xl"} px={6} py={2} bg={"bg.card"} justify={"space-between"} align={"center"}>
                        <Stack align={"flex-start"} spacing={1}>

                            <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sxs"} fontWeight={"extraLight"}>Fatura</Text>
                            
                            <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                        </Stack>
                        <RiRectangleLine size={80}/>
                    </Flex>
                </GridItem>

                <GridItem>
                    <Flex w={"100%"} h={"100%"} gap={12} rounded={"2xl"} px={6} py={2} bg={"bg.card"} justify={"space-between"} align={"center"}>
                        <Stack align={"flex-start"} spacing={1}>

                            <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sxs"} fontWeight={"extraLight"}>Fatura</Text>
                            
                            <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>682</Text>
                        </Stack>
                        <RiRectangleLine size={80}/>
                    </Flex>
                </GridItem> */}
            </Grid>

            <Box p={8} display={"flex"} gap={8} flexDirection={"column"} mb={8} bg={"grayDark.700"} border={"2px"} borderColor={"grayDark.500"} rounded={"xl"}>
                <Flex justify={"space-between"}>
                    <Heading size={"md"} fontWeight={"normal"}>Últimas Entregas</Heading>
                    <Button variant={"solid"} bg={"brand.50"} color={"text.secondary"} size={"xs"}>Filtrar</Button>
                </Flex>
                <Table colorScheme={"whiteAlpha"} fontSize={"xs"} fontWeight={"light"} color={"text.secondary"}>
                    <Thead>
                        <Th textTransform={"capitalize"}>No</Th>
                        <Th textTransform={"capitalize"}>ID</Th>
                        <Th textTransform={"capitalize"}>Data</Th>
                        <Th textTransform={"capitalize"}>Cliente</Th>
                        <Th textTransform={"capitalize"}>Localizacao</Th>
                        <Th textTransform={"capitalize"}>Valor</Th>
                        <Th textTransform={"capitalize"}>Entregador</Th>
                        <Th textTransform={"capitalize"}>Status</Th>
                        <Th textTransform={"capitalize"}></Th>
                    </Thead>
                    <Tbody>

                        <Tr>
                            <Td>1</Td>
                            <Td>#1234</Td>
                            <Td>Dec 13, 2026</Td>
                            <Td>Josemar Miguel</Td>
                            <Td>Vila Alice</Td>
                            <Td>2000 Kz</Td>
                            <Td>Ladislau Mbuila</Td>
                            <Td>
                                <Tag colorScheme="cyan" size={"sm"}>
                                    <TagLeftIcon as={RiCircleFill} size={2} color="cyan.500" />
                                    <TagLabel>Concluido</TagLabel>
                                </Tag>
                            </Td>
                            <Td>
                                <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>2</Td>
                            <Td>#1235</Td>
                            <Td>Dec 17, 2026</Td>
                            <Td>Josemar Miguel</Td>
                            <Td>Vila Alice</Td>
                            <Td>2000 Kz</Td>
                            <Td>Ladislau Mbuila</Td>
                            <Td>
                                <Tag colorScheme="purple" size={"sm"}>
                                    <TagLeftIcon as={RiCircleFill} size={2} color="brand.500" />
                                    <TagLabel>Cancelado</TagLabel>
                                </Tag>
                            </Td>
                            <Td>
                                <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>3</Td>
                            <Td>#1234</Td>
                            <Td>Dec 19, 2026</Td>
                            <Td>Josemar Miguel</Td>
                            <Td>Vila Alice</Td>
                            <Td>2000 Kz</Td>
                            <Td>Ladislau Mbuila</Td>
                            <Td>
                                <Tag colorScheme="orange" size={"sm"}>
                                    <TagLeftIcon as={RiCircleFill} size={2} color="orange.500" />
                                    <TagLabel>Bazando</TagLabel>
                                </Tag>
                            </Td>
                            <Td>
                                <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>4</Td>
                            <Td>#1234</Td>
                            <Td>Dec 25, 2026</Td>
                            <Td>Josemar Miguel</Td>
                            <Td>Vila Alice</Td>
                            <Td>2000 Kz</Td>
                            <Td>Ladislau Mbuila</Td>
                            <Td>
                                <Tag colorScheme="purple" size={"sm"}>
                                    <TagLeftIcon as={RiCircleFill} size={2} color="brand.500" />
                                    <TagLabel>Cancelado</TagLabel>
                                </Tag>
                            </Td>
                            <Td>
                                <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}