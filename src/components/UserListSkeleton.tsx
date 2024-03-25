import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function UserListSkeleton() {

    return (
        <Box>
            <Skeleton height='100px' width='200px' rounded='md' p='6'></Skeleton>
        </Box >
    );
}