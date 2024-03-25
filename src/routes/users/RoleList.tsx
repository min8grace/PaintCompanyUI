import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams, } from "react-router-dom";
import { getRoles } from "../../api";
import { IRoles, IDetailRole } from "../../types";
import { Box, Flex, HStack, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { DataTable } from "../../components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { PaintColourType } from "../../lib/getPaintColourType";
import { PaintStatusType } from "../../lib/getPaintStatusType";
import { useEffect, useState } from "react";
import { PermissionType } from "../../lib/getPermissionType";
import useUser from "../../lib/useUser";

export default function RoleList() {
    const { isLoading, data: Roles } = useQuery<IRoles>({
        queryKey: ["getAllRoles"],
        queryFn: getRoles,
    });

    const navigate = useNavigate();
    const { userLoading, isLoggedIn, user } = useUser();
    if (!userLoading && isLoggedIn) {
        if (user?.data.roleId != 4) {   
            navigate("/");
        }
    }

    if (!isLoading) {
        let permissioncollector: string = '';
        for (var detailRole of Roles!.data) {

            for (var permission of detailRole!.userRolePermissions) {
                permissioncollector += PermissionType[permission.permissionId];
                permissioncollector += ' / ';
            }
            detailRole.allPermissions = permissioncollector;
            permissioncollector = '';
        }
    }

    const columnHelper = createColumnHelper<IDetailRole>();
    const columns = [
        columnHelper.accessor("roleId", {
            cell: (info) => info.getValue(),
            header: "RoleId",
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor("roleName", {
            cell: (info) => info.getValue(),
            header: "RoleName",
        }),
        columnHelper.accessor("allPermissions", {
            cell: (info) => info.getValue(),
            header: "Permissions",
        }),
    ];

    return (
        <Box mt={10}
            pb={40}
            px={
                {
                    base: 10,
                    lg: 40
                }}
        >
            <HStack>
                <Box w='60%'>
                    <Text fontSize='xl' as='b'>
                        Role List
                    </Text>
                </Box>
            </HStack>

            {isLoading ? null : <DataTable columns={columns} data={Roles!.data} />}
        </Box >
    );
}