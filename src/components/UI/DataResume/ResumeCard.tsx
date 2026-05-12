import { Flex, HStack, Icon, IconButton, ResponsiveValue, Stack, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";

const bgVariants = {
    primary: "linear(bg.card, bg.card)", 
    gradient: "linear(155deg, #4FABFF, #4318FF)"
}

interface ResumeCardProps {
    title: string,
    value?: number | string,
    bgVariant?: keyof typeof bgVariants,
    icon?: React.ReactNode,
    pathColor?: string,
}

export function ResumeCard({title, value="0", bgVariant = "primary", icon, pathColor}: ResumeCardProps){
    return(
        <Flex w={"100%"} h={"96px"} minWidth={"240px"} maxW={"270px"} gap={10} rounded={"lg"} px={6} py={2} backgroundImage={bgVariants[bgVariant]} justify={"space-between"} align={"center"} borderColor={"navy.500"}>

            <Stack align={"flex-start"} spacing={2} w={"100%"}>

                <Flex direction={"row"} justify={"space-between"} w={"100%"} align={"center"}>
                    <HStack gap={1} align={"center"}>
                        <Icon><RiRectangleLine/></Icon>

                        <Text as={"h4"} color={bgVariant == "primary" ? "text.secondary" : "text.primary"} letterSpacing={"wide"} fontSize={"sm"} fontWeight={"normal"} >{title}</Text>
                    </HStack>

                    <IconButton aria-label={"date filters"} variant={"ghost"} size={"xs"} icon={<BsThreeDots/>} />
                </Flex>
                
                <Flex direction={"row"} justify={"space-between"} w={"100%"} align={"center"}>
                    <Text as={"span"} letterSpacing={"wide"} fontFamily={"heading"} fontWeight={"bold"} fontSize={"2xl"}>{value}</Text>
                    {icon}
                </Flex>
            </Stack>
            {/* {icon} */}
            {/* <svg viewBox="0 0 300 200">
                <path d="M0, 150 C50, 100 100, 200 150, 150 C200, 100 250, 180 300, 120" fill="none" stroke="#4facfe" strokeWidth={10} />
            </svg> */}
        </Flex>
    );
}