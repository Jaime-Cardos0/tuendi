import { Box, Stack, Text, Link } from "@chakra-ui/react";
import { BiSupport } from "react-icons/bi";
import { FaRoute } from "react-icons/fa6";
import { RiDashboardLine, RiUser3Line, RiUser2Line, RiLineChartLine } from "react-icons/ri";

interface NavSectionProps{
    title: string,
    children?: React.ReactNode,
}

export function NavSection({title, children}: NavSectionProps){
    return(
        <Box>
            <Text as={"h4"} fontSize={"sxs"} fontWeight={"hairline"} color={"text.muted"} letterSpacing={"widest"} textTransform={"uppercase"}>{title}</Text>
            <Stack spacing={4} mt={6}>
                <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
                    <RiDashboardLine size={"20px"}/>
                    <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>Dashboard</Text>
                </Link>
                
                <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
                    <FaRoute size={"20px"}/>
                    <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>Entrega</Text>
                </Link>

                <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
                    <RiUser3Line size={"20px"}/>
                    <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>Entregador</Text>
                </Link>

                <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
                    <RiUser2Line size={"20px"}/>
                    <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>Usuário</Text>
                </Link>
                
                <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
                    <RiLineChartLine size={"20px"}/>
                    <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>Finanças</Text>
                </Link>

                <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
                    <BiSupport size={"20px"}/>
                    <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>Suporte</Text>
                </Link>
            </Stack>
        </Box>
    );
}