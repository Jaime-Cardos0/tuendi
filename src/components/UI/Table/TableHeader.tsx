import { Flex, Heading } from "@chakra-ui/react";

interface TableHeaderProps {
    title: string;
}

export function TableHeader({ title }: TableHeaderProps) {
    return (
        <Flex justify={"space-between"}>
            <Heading size={"lg"} fontWeight={"medium"} fontFamily={"heading"}>
                {title}
            </Heading>
        </Flex>
    );
}