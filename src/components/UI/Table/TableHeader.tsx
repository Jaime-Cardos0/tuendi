import { Flex, Heading, Button } from "@chakra-ui/react";

export function TableHeader(){
    return(
        <Flex justify={"space-between"}>
            <Heading size={"xl"} fontWeight={"medium"} fontFamily={"mono"}>Últimas Entregas</Heading>
            <Button variant={"solid"} bg={"brand.50"} fontFamily={"mono"} color={"text.secondary"} size={"xs"}>Filtrar</Button>
        </Flex>
    );
}