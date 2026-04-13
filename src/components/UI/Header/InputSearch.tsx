import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";

export function InputSearch(){
    return(
        <InputGroup >

            <InputLeftElement pointerEvents={'none'} h={"100%"} pl={2} color={"text.secondary"}>
                <RiSearch2Line />
            </InputLeftElement>

            <Input
            variant={"unstyled"}
            w={"280px"}
            bgColor={"grayDark.600"}
            rounded={"xl"}
            fontSize={"sm"}
            fontFamily={"body"}
            letterSpacing={"tight"}
            _focus={{bg: "grayDark.500"}}
            color={"text.secondary"}
            name="search" 
            type="search" 
            placeholder={"Pesquisar..."}
            _placeholder={{color: "text.secondary", fontSize: "sm"}}
            px={6}
            pl={10}
            py={3}
        />

        </InputGroup>
    );
}