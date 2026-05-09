import { theme } from "@/styles/theme";
import { Box, Button, HStack, IconButton, Stack } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps{
    totalCountRegister?: number,
    registersPerPage?: number,
    currentPage?: number,
    onPageChange?: (page: number) => void,
}

export function Pagination({
    totalCountRegister = 100,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange
}: PaginationProps){
    const totalPages = totalCountRegister ? Math.ceil(totalCountRegister / registersPerPage) : 0;

    return(
        <HStack spacing={6} justify={"space-between"} align={"center"}>

            <Box>
                <strong style={{fontSize: theme.fontSizes.sm}}>{`${ (currentPage) } - ${Math.min(Number.isInteger(currentPage / registersPerPage) ? currentPage * registersPerPage : registersPerPage, totalCountRegister ?? 0)} de ${totalCountRegister}`}</strong>
            </Box>
            
            <HStack spacing={2}>
                <IconButton aria-label="go back" icon={<FaChevronLeft />} onClick={() => onPageChange?.(currentPage - 1)} disabled={currentPage === 1}></IconButton>
                {
                    currentPage < 2 ? "" :
                    <Button
                        key={currentPage-1}
                        size={"sm"}
                        fontSize={"xs"}
                        width={4}
                        bg={"gray.700"}
                        _hover={{ bg: "gray.500" }}
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
                        width={4}
                        bg={ "purple.500"}
                        _hover={{ bg: "purple.400"}}
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

                <IconButton aria-label="go forward" icon={<FaChevronRight />} onClick={() => onPageChange?.(currentPage + 1)} disabled={currentPage === totalPages}></IconButton>
                {/* <Button size={"sm"} fontSize={"xs"} width={4} bg={"gray.700"} _hover={{bg: "gray.500"}}>1</Button>
                <Button size={"sm"} fontSize={"xs"} width={4} color={"text.primary"} colorScheme="purple" disabled _disabled={{bg: "purple.500", cursor: "default"}} _hover={{bg: "purple.400"}}>1</Button>

                <Button size={"sm"} fontSize={"xs"} width={4} bg={"gray.700"} _hover={{bg: "gray.500"}}>2</Button>
                
                <Button size={"sm"} fontSize={"xs"} width={4} bg={"gray.700"} _hover={{bg: "gray.500"}}>3</Button>

                <Button size={"sm"} fontSize={"xs"} width={4} bg={"gray.700"} _hover={{bg: "gray.500"}}>4</Button>

                <Button size={"sm"} fontSize={"xs"} width={4} bg={"gray.700"} _hover={{bg: "gray.500"}}>5</Button>*/}
                </HStack>
        </HStack>
    );
}