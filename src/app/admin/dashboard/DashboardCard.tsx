import { FloatingMenu } from "@/components/UI/FloatingMenu";
import { Box, Flex, Heading, MenuItem, Stack, Text } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { RiFilter3Line } from "react-icons/ri";

interface DashboardCardProps {
    title: string,
    children: React.ReactNode,
    value?: number,
}

export function DashboardCard( {title, children, value} : DashboardCardProps){
    return(

        <Flex h={"100%"} direction={"column"} gap={5} rounded={"2xl"} p={6} bg={"bg.card"} align={"center"}>
            
            <Flex w={"100%"} h={"fit-content"} justify={"space-between"}>
                
                <Stack flex={1}>

                    <Heading size={"sm"} color={"text.secondary"} lineHeight={"relaxed"} letterSpacing={"wide"} fontWeight={"light"}>{title}</Heading>
                    
                    <Text as={"span"} fontWeight={"semibold"} lineHeight={"1"} fontFamily={"body"} letterSpacing={"tight"} fontSize={"4xl"}>{ value ? value.toLocaleString("pt-AO").concat(" Kz") : " "}</Text>
                </Stack>

                <FloatingMenu placement="bottom" menuIcon={<FaChevronDown fontSize={"xs"}/>}>
                    <MenuItem>Diário</MenuItem>
                    <MenuItem>Semanal</MenuItem>
                    <MenuItem>Mensal</MenuItem>
                    <MenuItem>Anual</MenuItem>
                </FloatingMenu>

            </Flex>

                <Box flex={1} minH={0}>
                    {children}
                </Box>
        </Flex> 
    );
}