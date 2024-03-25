import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, } from "react-router-dom";
import { getPaintById, getUser, IUpdateUser, updateUser } from "../../api";
import { IUsers, IUser } from "../../types";
import { Avatar, Box, Button, Container, Editable, EditableInput, EditablePreview, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, NumberInput, NumberInputField, Select, Skeleton, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PaintColourType } from "../../lib/getPaintColourType";
import { RoleType } from "../../lib/getRoleType";

export default function UserEdit() {
    const { userId } = useParams();
    const { isLoading, data: User } = useQuery<IUser>({
        queryKey: ["getAlluser", userId],
        queryFn: getUser,
    });

    const { register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<IUpdateUser>();

    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data: IUser) => {
            toast({
                status: "success",
                title: "User Data updated",
                position: "bottom-right",
            });
            navigate(`/UserRole/Users/`)
        },
    });
    const onSubmit = (data: IUpdateUser) => {
        data.userId = Number(userId);
        data.username = data.username;
        data.roleId = Number(data.roleId);
        data.isActive = Number(data.isActive) === 1 ? true : false;
        mutation.mutate(data);
    };

    return (<Box mt={10}
        pb={40}
        px={
            {
                base: 10,
                lg: 40
            }}
    >
        {isLoading ? null :
            <Container>
                <Heading textAlign={"center"}>Edit Paint Stock</Heading>
                <VStack
                    spacing={10}
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    mt={5}
                >
                    <FormControl>
                        <FormLabel>User ID</FormLabel>
                        <Input
                            {...register("userId", { required: "userId" })}
                            isReadOnly={true}
                            defaultValue={User?.data.userId}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            {...register("username", { required: "Please enter the username" })}
                            defaultValue={User?.data.username}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Select
                            {...register("roleId", { required: true })}
                            placeholder="Choose a User Role"
                            defaultValue={User?.data.roleId}>

                            {Object.keys(RoleType).map((value, key) =>
                                isNaN(Number(value)) ? null :
                                    <option key={Number(value)} value={Number(value)}>{RoleType[Number(value)]}</option>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Active User</FormLabel>
                        <Select
                            {...register("isActive", { required: "Please enter the isActive" })}
                            defaultValue={User?.data.isActive === true ? 1 : 0}
                        >
                            <option key={1} value={1}>True</option>
                            <option key={0} value={0}>False</option>
                        </Select>
                    </FormControl>
                    {mutation.isError ? (
                        <Text color="blue.500">Something went wrong</Text>
                    ) : null}
                    <Button
                        type="submit"
                        isLoading={mutation.isPending}
                        colorScheme={"blue"}
                        size="lg"
                        w="100%"
                    >Save</Button>
                </VStack>
            </Container>
        }
    </Box >
    );
}