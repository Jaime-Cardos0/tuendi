"use client"
import { Box } from "@chakra-ui/react";
import { ResumeComponent } from "../../../components/UI/DataResume";
import { TableContainer } from "../../../components/UI/Table";

export function MainDeliver(){
    return(
        <Box as="main" display={"flex"} flexDirection={"column"} gap={12} ml={52} mt={20}>
            
            <ResumeComponent />

            <TableContainer/>
        </Box>
    );
}