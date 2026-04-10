import { Box, Stack } from "@chakra-ui/react";
import { FaRoute } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";
import { ConfigurationIcon, DeliveryManIcon, HelpIcon, LineChartIcon, NotificationIcon, SupportIcon, UserIcon } from "@/components/Icons/icons";

export function Sidebar(){
    return(
        <Box as="aside" bg={"bg.default"} w={48} position={"fixed"} top={24} left={8}>
            <Stack spacing={12} align={"flex-start"}>

                <NavSection title="main admin">
                    <NavLink icon={<RiDashboardLine size={20}/>}>Dashboard</NavLink>
                    <NavLink icon={<FaRoute size={20}/>}>Entrega</NavLink>
                    <NavLink icon={<DeliveryManIcon strokeWidth={3} fontSize={20}/>}>Entregador</NavLink>
                    <NavLink icon={<UserIcon strokeWidth={2} fontSize={20}/>}>Usuário</NavLink>
                    <NavLink icon={<LineChartIcon strokeWidth={2} fontSize={20}/>}>Finanças</NavLink>
                    <NavLink icon={<SupportIcon strokeWidth={2} fontSize={20}/>}>Suporte</NavLink>
                </NavSection>

                <NavSection title="support admin">
                    <NavLink icon={<HelpIcon strokeWidth={2} fontSize={20}/>}>Ajuda</NavLink>
                    <NavLink icon={<NotificationIcon hasNotified={true} strokeWidth={2} fontSize={20}/>}>Notificações</NavLink>
                    <NavLink icon={<ConfigurationIcon strokeWidth={2} fontSize={20}/>}>Definições</NavLink>
                </NavSection>

            </Stack>
        </Box>
    );
}