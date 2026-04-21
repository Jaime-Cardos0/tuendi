"use client"

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, isValidElement, ReactNode } from "react";

interface ActiveLinkProps extends LinkProps{
    children: ReactNode,
}

export function ActiveLink({children, ...rest}: ActiveLinkProps){

    const asPath = usePathname();

    let isActive = false;

    // if(asPath == rest.href || asPath == rest.as){
    //     isActive = true;
    // }

    if(asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as))){
        isActive = true;
    }

    return(
        <Link {...rest}>
            {isValidElement(children)
                ? cloneElement(children, {
                    color: isActive ? "text.primary" : "text.muted",
                })
                : children}
        </Link>
    );
}