import { Box, Stack, Text } from "@chakra-ui/react";

interface NavSectionProps{
    title: string,
    children?: React.ReactNode,
}

export function NavSection({title, children}: NavSectionProps){
    return(
        <Box>
            <Text as={"h4"} fontSize={"sxs"} fontWeight={"hairline"} color={"text.muted"} letterSpacing={"widest"} textTransform={"uppercase"}>{title}</Text>
            <Stack spacing={4} mt={6}>
                {children}
            </Stack>
        </Box>
    );
}