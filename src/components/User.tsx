import { Box, VStack, Image, Button, Grid, Text, HStack, useColorModeValue, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { IDetailUser } from "../types";
import { RoleType } from "../lib/getRoleType";
interface IUserProps {
    userId: number,
    username?: string,
    roleId: number,
    isActive: boolean,
}

export default function User({ userId, username, roleId, isActive }: IUserProps) {
    const gray = useColorModeValue("gray.600", "gray.300");
    return (
        /* align element to the left */
        <Link to={`/UserRole/Users/Edit/${userId}`} >
            <VStack alignItems={"flex-start"} >

                <Box boxShadow='md' rounded='md' p='6' >

                    <Grid gap={2} templateColumns={"12fr 1fr"} >
                        <Text display={"black"} as="b" noOfLines={1} fontSize="md" color="blue.700">
                            {username}
                        </Text>
                        <HStack
                            _hover={{
                                color: "messenger.100"
                            }}
                            spacing={1}
                        >
                            <GrUserManager size="20px" />
                        </HStack>
                    </Grid>

                    <Text fontSize={"sm"} color={gray}>
                        Name: {username}
                    </Text>
                    <Text fontSize={"sm"} color={gray}>
                        Role: {RoleType[roleId]}
                    </Text>
                    <Text fontSize={"sm"} color={gray}>
                        Active: {isActive === true ? "True" : "False"}
                    </Text>
                </Box>


            </VStack>
        </Link>
    )
}