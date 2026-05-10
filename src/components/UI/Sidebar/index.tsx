import { Box, Stack } from "@chakra-ui/react";
import { FaRoute } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";
import { ConfigurationIcon, DeliveryManIcon, HelpIcon, LineChartIcon, NotificationIcon, SupportIcon, UserIcon } from "@/components/Icons/icons";

export function Sidebar(){
    return(
        <Box as="aside" bg={"bg.default"} w={48} h={"100vh"} position={"fixed"} top={24} left={0} pl={8} zIndex={1000}>
            <Stack spacing={8} align={"flex-start"}>

                <NavSection title="main admin">
                    <NavLink href="/admin/dashboard" icon={<RiDashboardLine size={20}/>}>Dashboard</NavLink>
                    <NavLink href="/admin/users" icon={<UserIcon strokeWidth={2} fontSize={20}/>}>Usuário</NavLink>
                    <NavLink href="/admin/deliveries" icon={<FaRoute size={20}/>}>Pedido</NavLink>
                    <NavLink href="/admin/riders" icon={<DeliveryManIcon strokeWidth={3} fontSize={20}/>}>Entregador</NavLink>
                    <NavLink href="/admin/earnings" icon={<LineChartIcon strokeWidth={2} fontSize={20}/>}>Ganhos</NavLink>
                </NavSection>

                <NavSection title="support admin">
                    <NavLink href="#" icon={<HelpIcon strokeWidth={2} fontSize={20}/>}>Suporte</NavLink>
                    <NavLink href="#" icon={<NotificationIcon strokeWidth={2} fontSize={20}/>}>Notificações</NavLink>
                    <NavLink href="#" icon={<ConfigurationIcon strokeWidth={2} fontSize={20}/>}>Definições</NavLink>
                </NavSection>

            </Stack>
        </Box>
    );
}