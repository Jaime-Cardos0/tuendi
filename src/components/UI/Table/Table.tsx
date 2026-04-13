import { Table, Thead, Th, Tbody, Tr, Td, Tag, TagLeftIcon, TagLabel, IconButton } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill } from "react-icons/ri";

export function TableComponent(){
    return(
        <Table w={"100%"} colorScheme={"whiteAlpha"} fontFamily={"heading"} fontSize={"xs"} fontWeight={"light"} color={"text.secondary"}>
            <Thead>
                <Th px={3} textTransform={"capitalize"}>No</Th>
                <Th px={3} textTransform={"capitalize"}>ID</Th>
                <Th px={3} textTransform={"capitalize"}>Data</Th>
                <Th px={3} textTransform={"capitalize"}>Cliente</Th>
                <Th px={3} textTransform={"capitalize"}>Localização</Th>
                <Th px={3} textTransform={"capitalize"}>Valor</Th>
                <Th px={3} textTransform={"capitalize"}>Entregador</Th>
                <Th px={3} textTransform={"capitalize"}>Status</Th>
                <Th px={3} textTransform={"capitalize"}></Th>
            </Thead>
            <Tbody>

                <Tr>
                    <Td px={3} py={2}>1</Td>
                    <Td px={3} py={2}>#1234</Td>
                    <Td px={3} py={2}>Dec 13, 2026</Td>
                    <Td px={3} py={2}>Josemar Miguel</Td>
                    <Td px={3} py={2}>Vila Alice</Td>
                    <Td px={3} py={2}>2000 Kz</Td>
                    <Td px={3} py={2}>Ladislau Mbuila</Td>
                    <Td px={3} py={2}>
                        <Tag colorScheme="cyan" size={"sm"}>
                            <TagLeftIcon as={RiCircleFill} size={2} color="cyan.500" />
                            <TagLabel>Concluido</TagLabel>
                        </Tag>
                    </Td>
                    <Td px={3} py={2}>
                        <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                    </Td>
                </Tr>

                <Tr>
                    <Td px={3} py={2}>2</Td>
                    <Td px={3} py={2}>#1235</Td>
                    <Td px={3} py={2}>Dec 17, 2026</Td>
                    <Td px={3} py={2}>Josemar Miguel</Td>
                    <Td px={3} py={2}>Vila Alice</Td>
                    <Td px={3} py={2}>2000 Kz</Td>
                    <Td px={3} py={2}>Ladislau Mbuila</Td>
                    <Td px={3} py={2}>
                        <Tag colorScheme="purple" size={"sm"}>
                            <TagLeftIcon as={RiCircleFill} size={2} color="brand.500" />
                            <TagLabel>Cancelado</TagLabel>
                        </Tag>
                    </Td>
                    <Td px={3} py={2}>
                        <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                    </Td>
                </Tr>

                <Tr>
                    <Td px={3} py={2}>3</Td>
                    <Td px={3} py={2}>#1234</Td>
                    <Td px={3} py={2}>Dec 19, 2026</Td>
                    <Td px={3} py={2}>Josemar Miguel</Td>
                    <Td px={3} py={2}>Vila Alice</Td>
                    <Td px={3} py={2}>2000 Kz</Td>
                    <Td px={3} py={2}>Ladislau Mbuila</Td>
                    <Td px={3} py={2}>
                        <Tag colorScheme="orange" size={"sm"}>
                            <TagLeftIcon as={RiCircleFill} size={2} color="orange.500" />
                            <TagLabel>Bazando</TagLabel>
                        </Tag>
                    </Td>
                    <Td px={3} py={2}>
                        <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                    </Td>
                </Tr>

                <Tr>
                    <Td px={3} py={2}>4</Td>
                    <Td px={3} py={2}>#1234</Td>
                    <Td px={3} py={2}>Dec 25, 2026</Td>
                    <Td px={3} py={2}>Josemar Miguel</Td>
                    <Td px={3} py={2}>Vila Alice</Td>
                    <Td px={3} py={2}>2000 Kz</Td>
                    <Td px={3} py={2}>Ladislau Mbuila</Td>
                    <Td px={3} py={2}>
                        <Tag colorScheme="purple" size={"sm"}>
                            <TagLeftIcon as={RiCircleFill} size={2} color="brand.500" />
                            <TagLabel>Cancelado</TagLabel>
                        </Tag>
                    </Td>
                    <Td px={3} py={2}>
                        <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                    </Td>
                </Tr>

                <Tr>
                    <Td px={3} py={2}>5</Td>
                    <Td px={3} py={2}>#1234</Td>
                    <Td px={3} py={2}>Dec 25, 2026</Td>
                    <Td px={3} py={2}>Josemar Miguel</Td>
                    <Td px={3} py={2}>Vila Alice</Td>
                    <Td px={3} py={2}>2000 Kz</Td>
                    <Td px={3} py={2}>Ladislau Mbuila</Td>
                    <Td px={3} py={2}>
                        <Tag colorScheme="purple" size={"sm"}>
                            <TagLeftIcon as={RiCircleFill} size={2} color="brand.500" />
                            <TagLabel>Cancelado</TagLabel>
                        </Tag>
                    </Td>
                    <Td px={3} py={2}>
                        <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                    </Td>
                </Tr>

                <Tr>
                    <Td px={3} py={2}>6</Td>
                    <Td px={3} py={2}>#1234</Td>
                    <Td px={3} py={2}>Dec 25, 2026</Td>
                    <Td px={3} py={2}>Josemar Miguel</Td>
                    <Td px={3} py={2}>Vila Alice</Td>
                    <Td px={3} py={2}>2000 Kz</Td>
                    <Td px={3} py={2}>Ladislau Mbuila</Td>
                    <Td px={3} py={2}>
                        <Tag colorScheme="purple" size={"sm"}>
                            <TagLeftIcon as={RiCircleFill} size={2} color="brand.500" />
                            <TagLabel>Cancelado</TagLabel>
                        </Tag>
                    </Td>
                    <Td px={3} py={2}>
                        <IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>
                    </Td>
                </Tr>
                
            </Tbody>
        </Table>
    );
}