import { Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/react";
import { ActiveLink } from "./ActiveLink";

interface NavLinkProps extends ChakraLinkProps{
    children: string,
    icon: React.ReactNode,
    href: string,
}

export function NavLink({icon, href, children, ...rest}: NavLinkProps){
    return(
        <ActiveLink href={href} passHref={true}>
            <ChakraLink as={"span"} display="flex" alignItems="center" gap={2} color={"text.muted"} fontSize={"xs"} {...rest}>
                {icon}
                <Text as={"span"} fontWeight={"normal"} letterSpacing={"normal"} textAlign={"end"}>{children}</Text>
            </ChakraLink>
        </ActiveLink>
    );
}