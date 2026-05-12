import { Flex, HStack } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../../../public/Assets/icons/BazaLogo.svg"
import { InputSearch } from "./InputSearch";
import { AvatarComponent } from "./AvatarComponent";
import { HeaderIconsComponent } from "./HeaderIconsComponent";

export function Header(){
    return(

        <Flex
            as={"header"}
            w={"100%"}
            maxW={"1440px"}
            h={"fit-content"}
            mx={"auto"}
            px={8}
            py={4}
            align={"center"}
            justify={"space-between"}
            position={"fixed"}
            top={0}
            left={0}
            bg={"bg.default"}
            zIndex={"1001"}
        >
            <Image src={logo} alt="Baza Logo"/>

            <HStack spacing={1} color={"text.secondary"} >

                <InputSearch/>

                <HeaderIconsComponent/>

                <AvatarComponent />

            </HStack>
        </Flex>
    );
}