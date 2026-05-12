import { Table, Thead, Th, Tbody, Tr, Td, IconButton, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill } from "react-icons/ri";

type Column<T> = {
  header: string;
  accessor?: string;
  // accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
};

type TableComponentProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export function TableComponent<T>({ data, columns }: TableComponentProps<T>) {
  // console.log(data)
  return (
    <Table variant={"striped"} colorScheme={"blackAlpha"} fontFamily={"heading"} fontSize={"xs"} fontWeight={"light"} color={"text.secondary"}>
      <Thead>
        <Tr>
          {columns.map((col, i) => (
            <Th key={i} px={3} textTransform={"capitalize"}>{col.header}</Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {data.map((row, i) => (
          <Tr key={i}>
            {columns.map((col, j) => (
              <Td key={j} px={3} py={2}>
                { col.render ? col.render(row) : col.accessor ? (row as any)[col.accessor] : null }
              </Td>
            ))}
          </Tr>
))}

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