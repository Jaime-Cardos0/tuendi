import { Box, IconButton, Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { TableComponent } from "../../../components/UI/Table/Table";
import { TableHeader } from "../../../components/UI/Table/TableHeader";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill } from "react-icons/ri";
import { Pagination } from "@/components/UI/Table/Pagination";

const users = [
    {id: 1, name: "Jaime", email: "jaime@gmail.com"},
    {id: 2, name: "Dorivaldo", email: "Dorivaldo@gmail.com"},
]

// interface usersProps {
//     id: number,
//     name: string,
//     email: string,
// }

export function TableDashboard(){

    const columns = [
        {header: "No", accessor: "name"},
        {header: "ID", accessor: "id"},
        {header: "E-mail", accessor: "email"},
        // {header: "Status", render: (user: usersProps) => (
        //                                     <Tag colorScheme="cyan" size={"sm"}>
        //                                         <TagLeftIcon as={RiCircleFill} size={2} color="cyan.500" />
        //                                         <TagLabel>Concluido</TagLabel>
        //                                     </Tag>)},
        // {header: "", render: (user: usersProps) => (<IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>)}
    ]

    return(
        <Box p={8} display={"flex"} gap={8} flexDirection={"column"} mb={8} bg={"grayDark.700"} border={"2px"} borderColor={"grayDark.500"} rounded={"xl"}>
            
            <TableHeader/>
            <TableComponent data={users} columns={columns}/> 
            {/* <hr/> */}
            <Pagination/>     
        </Box>
    );
}