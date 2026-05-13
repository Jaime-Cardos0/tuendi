import { Flex, Avatar, AvatarBadge, HStack, IconButton, Text, MenuItem } from "@chakra-ui/react";
import { RiArrowDownSLine } from "react-icons/ri";
import { FloatingMenu } from "../FloatingMenu";
import Link from "next/link";

export function AvatarComponent(){
    return(
        <Flex direction={"row"} align={"center"} gap={2} borderLeftWidth={2} borderColor={"border.default"} pl={3} py={0}>

            <Avatar
                bg={"brand.500"} 
                name={"Jaime Cardoso"} 
                src={"C:/Users/Jaime Cardoso/Documents/Projects/tuendi/public/Avatar.png"} 
                size={"sm"} 
                fontWeight={"bold"} 
                letterSpacing={"normal"} 
                color={"text.primary"}
            >

                <AvatarBadge boxSize={"1em"} bg={"status.success"}/>

            </Avatar>
            
            <HStack spacing={1}>
                <Text as={"span"} isTruncated maxW={"110px"} color={"text.primary"} fontSize={"sm"} fontWeight={"medium"} letterSpacing={"normal"} fontFamily={"heading"}>Jaime Cardoso</Text>

                <FloatingMenu placement="bottom" menuIcon={<RiArrowDownSLine/>}>
                    <MenuItem><Link href="admin/profile">Perfil</Link></MenuItem>
                    <MenuItem>Definições</MenuItem>
                    <MenuItem>Ajuda</MenuItem>
                </FloatingMenu>

            </HStack>
        </Flex>
    );
}