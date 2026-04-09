import { Icon, Link, LinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps extends LinkProps{
    children: string,
    icon: any,
}

export function NavLink({icon, children, ...rest}: NavLinkProps){
    return(
        <Link display="flex" alignItems="center" gap={2} color={"text.muted"} {...rest}>
            {icon}
            <Text as={"span"} fontFamily={"mono"} fontWeight={"medium"} textAlign={"end"}>{children}</Text>
        </Link>
    );
}