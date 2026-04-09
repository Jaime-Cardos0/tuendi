import { Link, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { RiDashboardLine } from "react-icons/ri";

interface NavLinkProps{
    name: string,
    children: React.ReactNode,
}

export function NavLink({name, children}: NavLinkProps){
    return(
        <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
            {children}
            <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>{name}</Text>
        </Link>
    );
}