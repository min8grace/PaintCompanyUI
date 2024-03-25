import { Button, Box, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useDisclosure } from "@chakra-ui/react";
import { PiUserBold, PiLockBold, PiHandsPraying } from "react-icons/pi";
import { TbAbc, TbMail, TbPhone } from "react-icons/tb";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    return (
        <Modal motionPreset="slideInTop" onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign Up</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
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
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><PiLockBold /></Box>
                            } />
                            <Input variant={"filled"} placeholder="Password Confirmation" />
                        </InputGroup>
                    </VStack>
                    <Button mt={4} w="100%" colorScheme={"blue"}>Sign Up - Sorry, in Progress</Button>
                </ModalBody>
            </ModalContent>

        </Modal>);
}