import { AbsoluteCenter, Box, Container, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Login from "./Login";

export default function Home() {
    return (
        <>
            {
                // (!inLoggedIn) ? (<Login></Login>) : (
                <Container w='90%' maxW='container.sm' alignItems={'center'} >
                    <Box mt='100px' >
                        <Heading size='4xl' mb={14} color='gray.600'>PAINT STOCK STATUS APP  </Heading >
                        <HStack>
                            <Box w='60%'></Box>
                            <Box w='40%' color='blue.600'>
                                <Text fontSize='xl' as='b'>
                                    DAVE MIN
                                </Text>
                                <Text fontSize='md' >
                                    Full Stack Developer
                                </Text>
                                <Text fontSize='xl' as='b'>
                                    BC Public Service
                                </Text>
                                <Text fontSize='md'>
                                    Hiring Process
                                </Text>
                                <Text fontSize='xl' as='b'>
                                    Code Challenge
                                </Text>
                                <Text fontSize='md'>
                                    IS21 Full Stack Developer
                                </Text>
                            </Box>
                        </HStack>
                    </Box >
                </Container >
                // )
            }
        </>
    );
}
