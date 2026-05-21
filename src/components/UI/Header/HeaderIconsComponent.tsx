"use client"

import { NotificationIcon } from "@/components/Icons/icons";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { RiSunLine } from "react-icons/ri";

export function HeaderIconsComponent(){

    const router = useRouter();

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
                aria-label="Notifications"
                fontSize={"xl"}
                w={"auto"}
                icon={<NotificationIcon strokeWidth={2}/>}
                variant={"ghost"}
                color={"text.secondary"}
                onClick={() => router.push("/admin/notifications")}
            />
        </>
    );
}