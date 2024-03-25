import { Button, Box, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useDisclosure, useToast, Text, HStack } from "@chakra-ui/react";
import { PiUserBold, PiLockBold } from "react-icons/pi";
import {
    getMe,
    IUsernameLoginError,
    IUsernameLoginSuccess,
    IUsernameLoginVariables,
    usernameLogIn,
} from "../api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [logInError, setlogInError] = useState("");
    const { register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<IForm>();
    // console.log(watch(), errors);

    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation<IUsernameLoginSuccess, IUsernameLoginError, IUsernameLoginVariables>({
        mutationFn: usernameLogIn,
        onMutate: () => {
            setlogInError("");
            reset();
            console.log("mutation starting");
        },
        onSuccess: (data) => {
            toast({
                title: "Login Success!",
                status: "success",
            });
            handleClose();
            queryClient.refetchQueries({ queryKey: ["me"] }); //useUser
        },
        onError: (error) => {
            setlogInError("Login failed: Invalid Username or Passoword");
        },
    });
    const onSubmit = ({ username, password }: IForm) => {
        mutation.mutate({ username, password });
    };
    const handleClose = () => {
        setlogInError("");
        reset();
        onClose();
    };
    return (
        <Modal motionPreset="slideInTop" onClose={handleClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><PiUserBold /></Box>
                            } />
                            <Input
                                isInvalid={Boolean(errors.username?.message)}
                                {...register("username", {
                                    required: "Please write a username",
                                })}
                                variant={"filled"}
                                placeholder="Username"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><PiLockBold /></Box>
                            } />
                            <Input
                                isInvalid={Boolean(errors.password?.message)}
                                {...register("password", {
                                    required: "Please write a password",
                                })}
                                type="password"
                                variant={"filled"}
                                placeholder="Password"
                            />
                        </InputGroup>
                        <Text fontSize="sm" color="red.500" textAlign={"center"}>{logInError}</Text>
                    </VStack>
                    <Button isLoading={mutation.isPending} mt={4} w="100%" colorScheme={"blue"} type="submit">Log in</Button>

                    <HStack>
                        <Text fontSize='md' as='b'>
                            UserId: John, Jane, Adam, PainterA, PainterB
                        </Text>
                    </HStack>
                    <HStack>
                        <Text fontSize='md' as='b'>
                            Password(All of them): asdf1234!
                        </Text>
                    </HStack>
                </ModalBody>
            </ModalContent>

        </Modal >);
}