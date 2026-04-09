import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { RiRectangleLine } from "react-icons/ri";

interface ResumeCardProps {
    title: string,
    value?: number | string,
    bgVariant?: {
        primary: "bg.card",
        gradient: "linear(to-br, blueAccent.600, brand.600)",
    }
}

export function ResumeCard({title, value="0"}: ResumeCardProps){
    return(
        <Flex w={"100%"} minWidth={"240px"} maxW={"270px"} gap={12} rounded={"2xl"} px={6} py={2} bg={"bg.card"} justify={"space-between"} align={"center"}>

            <Stack align={"flex-start"} spacing={1}>

                <Text as={"h4"} color={"text.secondary"} letterSpacing={"wide"} fontSize={"sm"} fontWeight={"normal"}>{title}</Text>
                
                <Text as={"span"} fontWeight={"medium"} fontSize={"2xl"}>{value}</Text>
            </Stack>
            <Icon as={RiRectangleLine} fontSize={80}></Icon>
            {/* <svg viewBox="0 0 300 200">
                <path d="M0, 150 C50, 100 100, 200 150, 150 C200, 100 250, 180 300, 120" fill="none" stroke="#4facfe" strokeWidth={10} />
            </svg> */}
        </Flex>
    );
}