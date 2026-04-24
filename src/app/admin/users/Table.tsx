import { Box, IconButton, Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { TableComponent } from "@/components/UI/Table/Table";
import { TableHeader } from "@/components/UI/Table/TableHeader";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill } from "react-icons/ri";
import { Pagination } from "@/components/UI/Table/Pagination";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { IUser } from "@/services/mirage/types";



export function UsersTable(){

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
            api.get("/users")
            .then((response) => setUsers(response.data.users))
            .catch((error) => console.error("Error fetching users:", error));
        }, []);

    const usersColumns = [
        {header: "No", accessor: "id"},
        {header: "ID", accessor: "firebaseUid"},
        {header: "Data", accessor: "createdAt"},
        {header: "Nome", accessor: "name"},
        {header: "E-mail", accessor: "email"},
        {header: "Telefone", accessor: "telephone"},
        {header: "Tipo", accessor: "role"},
        {header: "Status", render: (user: IUser) => (
                                            <Tag colorScheme="cyan" size={"sm"}>
                                                <TagLeftIcon as={RiCircleFill} size={2} color="cyan.500"/>
                                                <TagLabel>Concluido</TagLabel>
                                            </Tag>)},
        {header: "", render: (user: IUser) => (<IconButton variant={"ghost"} aria-label="Ver menu" icon={<BsThreeDots/>}/>)}
    ]

    return(
        <Box p={8} display={"flex"} gap={8} flexDirection={"column"} mb={8} bg={"grayDark.700"} border={"2px"} borderColor={"grayDark.500"} rounded={"xl"}>
            
            <TableHeader title="Usuários" />
            <TableComponent data={users} columns={usersColumns}/>   
            <Pagination/>   
        </Box>
    );
}