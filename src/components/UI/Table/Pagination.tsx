import { theme } from "@/styles/theme";
import { Box, Button, HStack, Stack } from "@chakra-ui/react";

export function Pagination(){
    return(
        <HStack spacing={6} justify={"space-between"} align={"center"}>

            <Box>
                <strong style={{fontSize: theme.fontSizes.sm}}>0-10 de 100</strong>
            </Box>
            
            <HStack spacing={2}>
                <Button size={"sm"} fontSize={"xs"} width={4} color={"text.primary"} colorScheme="purple" disabled _disabled={{bg: "purple.500", cursor: "default"}} _hover={{bg: "purple.400"}}>1</Button>

                <Button size={"sm"} fontSize={"xs"} width={4} bg={"gray.700"} _hover={{bg: "gray.500"}}>2</Button>
                
                <Button size={"sm"} fontSize={"xs"} width={4} bg={"gray.700"} _hover={{bg: "gray.500"}}>3</Button>

                <Button size={"sm"} fontSize={"xs"} width={4} bg={"gray.700"} _hover={{bg: "gray.500"}}>4</Button>

                <Button size={"sm"} fontSize={"xs"} width={4} bg={"gray.700"} _hover={{bg: "gray.500"}}>5</Button>
                </HStack>
        </HStack>
    );
}