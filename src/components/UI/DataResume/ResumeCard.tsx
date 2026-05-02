import { Flex, Icon, ResponsiveValue, Stack, Text } from "@chakra-ui/react";
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
        <Flex w={"100%"} h={"96px"} minWidth={"240px"} maxW={"270px"} gap={10} rounded={"2xl"} px={6} py={2} backgroundImage={bgVariants[bgVariant]} justify={"space-between"} align={"center"}>

            <Stack align={"flex-start"} spacing={1}>

                <Text as={"h4"} color={bgVariant == "primary" ? "text.secondary" : "text.primary"} letterSpacing={"wider"} fontSize={"sm"} fontWeight={"medium"} >{title}</Text>
                
                <Text as={"span"} letterSpacing={"wider"} fontFamily={"heading"} fontWeight={"bold"} fontSize={"2xl"}>{value}</Text>
            </Stack>
            {icon ? icon : <svg viewBox="0 0 300 200">
                <path d="M0, 150 C50, 100 100, 200 150, 150 C200, 100 250, 180 300, 120" fill="none" stroke={pathColor} strokeWidth={10} />
            </svg> }
            {/* <svg viewBox="0 0 300 200">
                <path d="M0, 150 C50, 100 100, 200 150, 150 C200, 100 250, 180 300, 120" fill="none" stroke="#4facfe" strokeWidth={10} />
            </svg> */}
        </Flex>
    );
}