import { Flex, Heading, Button } from "@chakra-ui/react";

export function TableHeader(){
    return(
        <Flex justify={"space-between"}>
            <Heading size={"md"} fontWeight={"normal"}>Últimas Entregas</Heading>
            <Button variant={"solid"} bg={"brand.50"} color={"text.secondary"} size={"xs"}>Filtrar</Button>
        </Flex>
    );
}