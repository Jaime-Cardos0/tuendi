import { UsersContext } from "@/contexts/UsersContext";
import { theme } from "@/styles/theme";
import { Box, Button, HStack, IconButton, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps{
    totalCountRegister?: number,
    registersPerPage?: number,
    currentPage?: number,
    onPageChange?: (page: number) => void,
}

export function Pagination({
    totalCountRegister = 0,
    registersPerPage = 0,
    currentPage = 1,
    onPageChange
}: PaginationProps){
    const totalPages = totalCountRegister ? Math.ceil(totalCountRegister / registersPerPage) : 0;

    return(
        <HStack spacing={6} justify={"space-between"} align={"center"}>

            <Box>
                <strong style={{fontSize: theme.fontSizes.sm}}>{`${ (currentPage - 1) * registersPerPage + 1 } - ${Math.min(Number.isInteger(currentPage / registersPerPage) ? currentPage * registersPerPage : registersPerPage, totalCountRegister ?? 0)} de ${totalCountRegister}`}</strong>
            </Box>
            
            <HStack spacing={2}>
                <IconButton aria-label="go back" icon={<FaChevronLeft />} size={"sm"} onClick={() => onPageChange?.(currentPage - 1)} disabled={currentPage === 1}></IconButton>
                {
                    currentPage < 2 ? "" :
                    <Button
                        key={currentPage-1}
                        size={"sm"}
                        fontSize={"xs"}
                        width={4}
                        bg={"navy.800"}
                        _hover={{ bg: "navy.700" }}
                        onClick={() => onPageChange?.(currentPage - 1)}
                    >
                        {currentPage - 1}
                    </Button>
                
                }
                {
                    <Button
                        key={currentPage}
                        size={"sm"}
                        fontSize={"xs"}
                        width={"12px"}
                        bg={ "brand.500"}
                        _hover={{ bg: "brand.400"}}
                        onClick={() => onPageChange?.(currentPage)}
                    >
                        {currentPage}
                    </Button>
                }

                {
                    currentPage > totalPages - 1 ? "" :
                    <Button
                        key={currentPage + 1}
                        size={"sm"}
                        fontSize={"xs"}
                        width={4}
                        bg={"gray.700"}
                        _hover={{ bg: "gray.500" }}
                        onClick={() => onPageChange?.(currentPage + 1)}
                    >
                        {currentPage + 1}
                    </Button>
                
                }

                <IconButton aria-label="go forward" icon={<FaChevronRight />} size={"sm"} onClick={() => onPageChange?.(currentPage + 1)} disabled={currentPage === totalPages}></IconButton>
            </HStack>
        </HStack>
    );
}