import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api";
import { IUsers } from "../../types";
import { Box, Grid, Heading, Image, VStack, Text, Button, Skeleton, SkeletonText, HStack } from "@chakra-ui/react";
import User from "../../components/User";
import UserListSkeleton from "../../components/UserListSkeleton";
import useUser from "../../lib/useUser";
import { useNavigate } from "react-router-dom";

export default function UserList() {
    const { isLoading, data } = useQuery<IUsers>({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    const navigate = useNavigate();
    const { userLoading, isLoggedIn, user } = useUser();
    if (!userLoading && isLoggedIn) {
        if (user?.data.roleId != 4) {
            navigate("/");
        }
    }
    return (
        <Box mt={10}
            pb={40}
            px={
                {
                    base: 10,
                    lg: 40
                }}>
            <HStack>
                <Box w='60%'>
                    <Text fontSize='xl' as='b'>
                        User List
                    </Text>
                </Box>
            </HStack>
            <Grid mt={10}
                columnGap={4}
                rowGap={8}
                templateColumns={{
                    // Chakra's base is the mobile phone
                    sm: "1fr",
                    md: "1fr 1fr",
                    lg: "repeat(3, 1fr)",
                    xl: "repeat(4, 1fr)",
                    "2xl": "repeat(5, 1fr)"
                }}>
                {isLoading ?
                    (
                        <>
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                            <UserListSkeleton />
                        </>
                    ) : (
                        null
                    )}

                {data?.data.map((user) => (
                    <User
                        userId={user.userId}
                        username={user.username}
                        roleId={user.roleId}
                        isActive={user.isActive}
                    />
                ))}
            </Grid >
        </Box>
    );
}