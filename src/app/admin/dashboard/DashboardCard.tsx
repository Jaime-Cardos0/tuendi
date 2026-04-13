import { FloatingMenu } from "@/components/UI/FloatingMenu";
import { Box, Flex, Heading, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import { title } from "process";
import { RiFilter3Line, RiRectangleLine } from "react-icons/ri";

interface DashboardCardProps {
    title: string,
    children: React.ReactNode,
    value?: number
}

export function DashboardCard( {title, children, value} : DashboardCardProps){
    return(

        <Flex h={"100%"} direction={"column"} gap={5} rounded={"2xl"} p={6} bg={"bg.card"} align={"center"}>
            
            <Flex w={"100%"} h={"fit-content"} justify={"space-between"} align={"flex-start"}>
                
                <Stack flex={1}>

                    <Heading size={"sm"} color={"text.secondary"} lineHeight={"relaxed"} letterSpacing={"wide"} fontWeight={"light"}>{title}</Heading>
                    
                    <Text as={"span"} fontWeight={"semibold"} lineHeight={"1"} fontFamily={"body"} letterSpacing={"tight"} textAlign={"center"} fontSize={"4xl"}>{value} KZ</Text>
                </Stack>

                <FloatingMenu menuIcon={<RiFilter3Line/>}/>

            </Flex>

                <Box flex={1} minH={0}>
                    {children}
                </Box>
        </Flex> 
        // </>
    );
}