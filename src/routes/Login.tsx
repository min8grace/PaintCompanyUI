import { Button, Box, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useDisclosure, AbsoluteCenter, Container } from "@chakra-ui/react";
import { PiUserBold, PiLockBold } from "react-icons/pi";
import { usernameLogIn } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Login() {

    return (

        <Container h='100%' w='100%' >
            <AbsoluteCenter mt={"60"} w='350px'>
                <VStack alignItems={"flex-start"}>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.500"><PiUserBold /></Box>
                        } />
                        <Input variant={"filled"} placeholder="Username" />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.500"><PiLockBold /></Box>
                        } />
                        <Input variant={"filled"} placeholder="Password" />
                    </InputGroup>

                </VStack>
                {/* <Button mt={4} w="100%" colorScheme={"cyan"} onClick={handleLogin}>Log in</Button> */}
            </AbsoluteCenter>
        </Container >);
}