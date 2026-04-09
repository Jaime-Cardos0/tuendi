import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { RiDashboardFill } from "react-icons/ri";

export function PageNav(){
    return(
        <Flex>
            <Heading as={"h2"} size={"xl"} fontWeight={"light"} color={"text.primary"}>Dashboard</Heading>

            <Stack>
                <Link display="flex" alignItems="center" gap={2} color={"text.muted"}>
                    <RiDashboardFill size={"20px"}/>
                    <Text fontSize={"xs"} fontWeight={"hairline"} color={"text.muted"} letterSpacing={"widest"}>MAIN ADMIN</Text>
                </Link>
            </Stack>
        </Flex>
    );
}