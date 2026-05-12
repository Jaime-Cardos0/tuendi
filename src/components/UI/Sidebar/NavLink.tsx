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
            <ChakraLink as={"span"} w={"100%"} _hover={{bg: "navy.600"}} textDecoration={"none"} display="flex" alignItems="center" gap={2} color={"text.muted"} rounded={"4px 12px 12px 4px"} fontSize={"sm"} {...rest}>
                {icon}
                <Text as={"span"} fontWeight={"normal"} letterSpacing={"spaced"} textAlign={"end"}>{children}</Text>
            </ChakraLink>
        </ActiveLink>
    );
}