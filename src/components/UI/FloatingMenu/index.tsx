import { Menu, MenuButton, IconButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ReactElement } from "react";

interface FloatingMenuProps {
    menuIcon: ReactElement,
}

export function FloatingMenu({menuIcon}:FloatingMenuProps){
    return(
        <Menu isLazy={true} placement="right-end">
            <MenuButton as={IconButton} aria-label="options" icon={menuIcon} h={7} fontSize={"xl"} variant={"ghost"}>
            </MenuButton>
                <MenuList>
                    <MenuItem>New Tab</MenuItem>
                    <MenuItem>other</MenuItem>
                    <MenuItem>New T1ab</MenuItem>
                </MenuList>
        </Menu>
    );
}