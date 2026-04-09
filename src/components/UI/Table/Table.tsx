import { Table, Thead, Th, Tbody, Tr, Td, Tag, TagLeftIcon, TagLabel, IconButton } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill } from "react-icons/ri";

export function TableComponent(){
    return(
        <Table colorScheme={"whiteAlpha"} fontSize={"xs"} fontWeight={"light"} color={"text.secondary"}>
            <Thead>
                <Th textTransform={"capitalize"}>No</Th>
                <Th textTransform={"capitalize"}>ID</Th>
                <Th textTransform={"capitalize"}>Data</Th>
                <Th textTransform={"capitalize"}>Cliente</Th>
                <Th textTransform={"capitalize"}>Localizacao</Th>
                <Th textTransform={"capitalize"}>Valor</Th>
                <Th textTransform={"capitalize"}>Entregador</Th>
                <Th textTransform={"capitalize"}>Status</Th>
                <Th textTransform={"capitalize"}></Th>
            </Thead>
            <Tbody>

                <Tr>
                    <Td>1</Td>
                    <Td>#1234</Td>
                    <Td>Dec 13, 2026</Td>
                    <Td>Josemar Miguel</Td>
                    <Td>Vila Alice</Td>
                    <Td>2000 Kz</Td>
                    <Td>Ladislau Mbuila</Td>
                    <Td>
                        <Tag colorScheme="cyan" size={"sm"}>
                            <TagLeftIcon as={RiCircleFill} size={2} color="cyan.500" />
                            <TagLabel>Concluido</TagLabel>
                        </Tag>
                    </Td>
                    <Td>
                        <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                    </Td>
                </Tr>

                <Tr>
                    <Td>2</Td>
                    <Td>#1235</Td>
                    <Td>Dec 17, 2026</Td>
                    <Td>Josemar Miguel</Td>
                    <Td>Vila Alice</Td>
                    <Td>2000 Kz</Td>
                    <Td>Ladislau Mbuila</Td>
                    <Td>
                        <Tag colorScheme="purple" size={"sm"}>
                            <TagLeftIcon as={RiCircleFill} size={2} color="brand.500" />
                            <TagLabel>Cancelado</TagLabel>
                        </Tag>
                    </Td>
                    <Td>
                        <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                    </Td>
                </Tr>

                <Tr>
                    <Td>3</Td>
                    <Td>#1234</Td>
                    <Td>Dec 19, 2026</Td>
                    <Td>Josemar Miguel</Td>
                    <Td>Vila Alice</Td>
                    <Td>2000 Kz</Td>
                    <Td>Ladislau Mbuila</Td>
                    <Td>
                        <Tag colorScheme="orange" size={"sm"}>
                            <TagLeftIcon as={RiCircleFill} size={2} color="orange.500" />
                            <TagLabel>Bazando</TagLabel>
                        </Tag>
                    </Td>
                    <Td>
                        <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                    </Td>
                </Tr>

                <Tr>
                    <Td>4</Td>
                    <Td>#1234</Td>
                    <Td>Dec 25, 2026</Td>
                    <Td>Josemar Miguel</Td>
                    <Td>Vila Alice</Td>
                    <Td>2000 Kz</Td>
                    <Td>Ladislau Mbuila</Td>
                    <Td>
                        <Tag colorScheme="purple" size={"sm"}>
                            <TagLeftIcon as={RiCircleFill} size={2} color="brand.500" />
                            <TagLabel>Cancelado</TagLabel>
                        </Tag>
                    </Td>
                    <Td>
                        <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    );
}