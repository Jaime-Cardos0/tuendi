import { Box } from "@chakra-ui/react";
import { TableComponent } from "./Table";
import { TableHeader } from "./TableHeader";

export function TableContainer(){
    return(
        <Box p={8} display={"flex"} gap={8} flexDirection={"column"} mb={8} bg={"grayDark.700"} border={"2px"} borderColor={"grayDark.500"} rounded={"xl"}>
            
            <TableHeader/>
            <TableComponent/>      
        </Box>
    );
}