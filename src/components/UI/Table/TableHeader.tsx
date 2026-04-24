import { Flex, Heading, Button } from "@chakra-ui/react";

interface TableHeaderProps {
    title: string;
    onFilterClick?: () => void;
}

export function TableHeader({ title, onFilterClick }: TableHeaderProps) {
    return (
        <Flex justify={"space-between"}>
            <Heading size={"xl"} fontWeight={"medium"} fontFamily={"mono"}>
                {title}
            </Heading>
            {/* <Button variant={"solid"} bg={"brand.50"} fontFamily={"mono"} color={"text.secondary"} size={"xs"} onClick={onFilterClick}>
                Filtrar
            </Button> */}
        </Flex>
    );
}