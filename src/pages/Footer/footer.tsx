import {
    Box,
    Flex,
    Text
} from '@chakra-ui/react';
export default function Footer() {
    return (
        <>
            <Flex direction="column">
                <Box as="footer" bgGradient="linear(to-r, rgba(255,0,0,0.1), rgba(0,0,255,0.1))" py={4} textAlign="center" width="100%" minH={{ base: "10vh" }}>
                    <Text fontSize="sm" color="gray.600">Copyright (c) 2025 Hayate887</Text>
                </Box>
            </Flex>
        </>
    );
}
