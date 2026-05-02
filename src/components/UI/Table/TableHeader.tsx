import { Flex, Heading } from "@chakra-ui/react";

interface TableHeaderProps {
    title: string;
}

export function TableHeader({ title }: TableHeaderProps) {
    return (
        <Flex justify={"space-between"}>
            <Heading size={"xl"} fontWeight={"medium"} fontFamily={"mono"}>
                {title}
            </Heading>
        </Flex>
    );
}