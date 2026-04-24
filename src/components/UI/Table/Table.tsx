import { Table, Thead, Th, Tbody, Tr, Td } from "@chakra-ui/react";

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
    <Table colorScheme={"whiteAlpha"} fontFamily={"heading"} fontSize={"xs"} fontWeight={"light"} color={"text.secondary"}>
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
      </Tbody>
    </Table>
  );
}