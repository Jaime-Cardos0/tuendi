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
            bgColor={"grayDark.700"}
            rounded={"xl"}
            fontSize={"sm"}
            fontFamily={"mono"}
            _focus={{bg: "grayDark.600"}}
            color={"text.secondary"}
            name="search" 
            type="search" 
            placeholder={"Pesquisar..."}
            _placeholder={{color: "text.secondary", fontSize: "xs"}}
            px={6}
            pl={10}
            py={3}
        />

        </InputGroup>
    );
}