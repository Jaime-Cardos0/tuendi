"use client"

import { Button, Flex, Heading, Input, Stack } from "@chakra-ui/react"
// ainda tens de componentizar isso direito, os inpust sao componentes de form, os flex sao components de layout, e o login em si e um componente de ui
export function Login(){
    return(
        <Flex 
            as={'main'} 
            w='100vw' 
            h='100vh' 
            align={"center"} 
            justify={"center"}>

            <Flex 
                as={"form"}
                method={"POST"}  
                w={'100%'} 
                maxW={'360px'} 
                p={8} 
                rounded={6} 
                bg={"bg.card"} 
                direction="column" 
                align={"center"} 
                gap={8}>

                <Heading size={"lg"}>Login</Heading>
                
                <Stack gap={4} w={"100%"}>
                    <Input 
                    variant={"filled"}
                    focusBorderColor={ "brand.500" } 
                    bgColor={"grayDark.800"}
                    _hover={{bg: "grayDark.800"}}
                    _focus={{bg: "grayDark.800"}}
                    css={{"--error-color": "red"}}
                    color={"text.secondary"}
                    name="email" 
                    type="email" 
                    placeholder={"E-mail"} 
                />

                <Input 
                    variant={"filled"}
                    focusBorderColor={ "brand.500" } 
                    bgColor={"grayDark.800"}
                    _hover={{bg: "grayDark.800"}}
                    _focus={{bg: "grayDark.800"}}
                    css={{"--error-color": "red"}}
                    color={"text.secondary"} 
                    name="senha" 
                    type="password" 
                    placeholder={"Palavra-passe"}
                />
                
                </Stack>

                <Button 
                    w={"100%"}
                    type="submit" 
                    bg={"brand.500"}
                    color={"brand.50"}
                    _hover={{bg: "brand.600"}}
                >Entrar</Button>
          
            </Flex>
   
        </Flex>
    );
}