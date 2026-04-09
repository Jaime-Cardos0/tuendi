import { Flex, Avatar, AvatarBadge, HStack, IconButton, Text } from "@chakra-ui/react";
import { RiArrowDownSLine } from "react-icons/ri";

export function AvatarComponent(){
    return(
        <Flex direction={"row"} align={"center"} gap={2} borderLeftWidth={2} borderColor={"border.default"} pl={3} py={0}>

            <Avatar
                bg={"brand.500"} 
                name={"Jaime Cardoso"} 
                src={"C:/Users/Jaime Cardoso/Documents/Projects/tuendi/public/Avatar.png"} 
                size={"sm"} 
                fontWeight={"bold"} 
                letterSpacing={"wide"} 
                color={"text.primary"}
            >

                <AvatarBadge boxSize={"1em"} bg={"status.success"}/>

            </Avatar>
            
            <HStack spacing={1}>
                <Text as={"span"} w={"110px"} color={"text.secondary"} fontSize={"sm"}fontWeight={"medium"} letterSpacing={"wide"}>Jaime Cardoso</Text>

                <IconButton
                    aria-label="Arrow pointing down" 
                    fontSize={"xl"}
                    icon={<RiArrowDownSLine/>}
                    variant={"ghost"}
                    color={"text.secondary"}
                />
            </HStack>
        </Flex>
    );
}