import { IconButton } from "@chakra-ui/react";
import { RiSunLine, RiNotification2Line } from "react-icons/ri";

export function HeaderIconsComponent(){
    return(
        <>
            <IconButton
                aria-label="Switch light/dark mode"
                fontSize={"xl"}
                w={"auto"}
                icon={<RiSunLine />}
                variant={"ghost"}
                color={"text.secondary"}
            />
            
            <IconButton
                aria-label="Switch light/dark mode"
                fontSize={"xl"}
                w={"auto"}
                icon={<RiNotification2Line />}
                variant={"ghost"}
                color={"text.secondary"}
            />
        </>
    );
}