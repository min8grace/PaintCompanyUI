import { useQuery } from "@tanstack/react-query";
import { getAllPaintStocks } from "../../api";
import { IPaintStock, IDetailPaintStock, IPaintStocks } from "../../types";
import { Box, Button, Flex, HStack, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { DataTable } from "../../components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { PaintColourType } from "../../lib/getPaintColourType";
import { PaintStatusType } from "../../lib/getPaintStatusType";
import useUser from "../../lib/useUser";


export default function PaintStockList() {
    const { isLoading, data: PaintStocks } = useQuery<IPaintStocks>({
        queryKey: ["getAllPaintStocks"],
        queryFn: getAllPaintStocks,
    });

    let editAuthorized = true;
    const { userLoading, isLoggedIn, user } = useUser();
    if (!userLoading && isLoggedIn) {
        if (user?.data.roleId == 1) {
            editAuthorized = false;
        }
    }

    const columnHelper = createColumnHelper<IDetailPaintStock>();
    let columns = [
        columnHelper.accessor("colour", {
            cell: (info) => {
                return PaintColourType[info.getValue()];
            },
            header: "Colour",
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor("quantity", {
            cell: (info) => info.getValue(),
            header: "Quantity",
            meta: {
                isNumeric: true
            }
        }),

        columnHelper.accessor("paintStatus", {
            cell: (info) => {
                return PaintStatusType[info.getValue()];
            },
            header: "PaintStatus",
            meta: {
                isNumeric: true
            }
        }),
    ];
    if (editAuthorized) {
        columns.push(columnHelper.accessor("colour", {
            cell: (info) => (
                <HStack>
                    <Button size='sm' as='a' href={`/PaintStockList/Edit/${info.getValue()}`}>Edit</Button>
                </HStack>
            ),
            header: "",
        }));
    }

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
                        Paint Stock Status List
                    </Text>
                </Box>
            </HStack>

            {isLoading ? null : <DataTable columns={columns} data={PaintStocks!.data} />}
        </Box >
    );
}