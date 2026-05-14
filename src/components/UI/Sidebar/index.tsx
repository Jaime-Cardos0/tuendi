import { Box, Stack } from "@chakra-ui/react";
import { FaRoute } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";
import { ConfigurationIcon, DeliveryManIcon, HelpIcon, LineChartIcon, NotificationIcon, SupportIcon, UserIcon } from "@/components/Icons/icons";

export function Sidebar(){
    return(
        <Box as="aside" w={48} h={"100vh"} position={"fixed"} top={24} left={0} pl={6} pr={2} zIndex={1000} bgColor={"bg.default"} borderRightWidth={1} borderColor={"navy.700"} boxShadow={"0 8px 32px rgba(0, 0, 0, 0.3)"}>
            <Stack spacing={8} align={"flex-start"} w={"100%"}>

                <NavSection title="main admin">
                    <NavLink href="/admin/dashboard" icon={<RiDashboardLine size={20}/>}>Dashboard</NavLink>
                    <NavLink href="/admin/users" icon={<UserIcon strokeWidth={2} fontSize={20}/>}>Usuário</NavLink>
                    <NavLink href="/admin/deliveries" icon={<FaRoute size={20}/>}>Entregas</NavLink>
                    <NavLink href="/admin/riders" icon={<DeliveryManIcon strokeWidth={3} fontSize={20}/>}>Entregadores</NavLink>
                    <NavLink href="/admin/earnings" icon={<LineChartIcon strokeWidth={2} fontSize={20}/>}>Ganhos</NavLink>
                </NavSection>

                <NavSection title="support admin">
                    <NavLink href="/admin/help" icon={<HelpIcon strokeWidth={2} fontSize={20}/>}>Suporte</NavLink>
                    <NavLink href="/admin/notifications" icon={<NotificationIcon strokeWidth={2} fontSize={20}/>}>Notificações</NavLink>
                    <NavLink href="/admin/settings" icon={<ConfigurationIcon strokeWidth={2} fontSize={20}/>}>Definições</NavLink>
                </NavSection>

            </Stack>
        </Box>
    );
}