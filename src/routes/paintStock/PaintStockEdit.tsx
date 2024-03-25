import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, } from "react-router-dom";
import { getPaintById, IUpdatePaintStock, updatePaintStock } from "../../api";
import { IPaintStock, IPaintStocks } from "../../types";
import { Avatar, Box, Button, Container, Editable, EditableInput, EditablePreview, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, NumberInput, NumberInputField, Select, Skeleton, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PaintColourType } from "../../lib/getPaintColourType";

export default function PaintStockEdit() {
    const { colourPk } = useParams();
    const { isLoading, data: PaintStock } = useQuery<IPaintStock>({
        queryKey: ["getAllPaintStock", colourPk],
        queryFn: getPaintById,
    });

    const { register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<IUpdatePaintStock>();

    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: updatePaintStock,
        onSuccess: (data: IPaintStock) => {
            toast({
                status: "success",
                title: "Paint Stock updated",
                position: "bottom-right",
            });
            navigate(`/PaintStockList/`)
        },
    });
    const onSubmit = (data: IUpdatePaintStock) => {
        data.colour = Number(colourPk);
        data.quantity = Number(data.quantity)
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
                        <FormLabel>Colour</FormLabel>
                        <Input
                            {...register("colour", { required: "Please select colour" })}
                            isReadOnly={true}
                            defaultValue={PaintColourType[PaintStock!.data.colour]}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Quantity</FormLabel>
                        <Input
                            {...register("quantity", { required: "Please enter the quantity" })}
                            type="number"
                            min={0}
                            defaultValue={PaintStock?.data.quantity}
                        />
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