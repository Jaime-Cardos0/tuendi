import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { BiHelpCircle, BiSupport } from "react-icons/bi";
import { FaRoute } from "react-icons/fa";
import { RiCircleLine, RiDashboardLine, RiLineChartLine, RiNotificationLine, RiUser2Line, RiUser3Line } from "react-icons/ri";
import { NavSection } from "./NavSection";

export function Sidebar(){
    return(
        <Box as="aside" w={48} position={"fixed"} top={24} left={8}>
            <Stack spacing={12} align={"flex-start"}>

                <NavSection title="main admin"/>

                <Box>
                    <Text as={"h4"} fontSize={"sxs"} fontWeight={"hairline"} color={"text.muted"} letterSpacing={"widest"}>SUPPORT ADMIN</Text>
                    <Stack spacing={4} mt={6}>

                        <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
                            <BiHelpCircle size={"20px"}/>
                            <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>Ajuda</Text>
                        </Link>
                        
                        <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
                            <RiNotificationLine size={"20px"}/>
                            <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>Notificações</Text>
                        </Link>

                        <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
                            <RiCircleLine size={"20px"}/>
                            <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>Definições</Text>
                        </Link>
                        
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}