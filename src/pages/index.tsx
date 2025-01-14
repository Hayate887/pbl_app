import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  VStack
} from '@chakra-ui/react';
import Head from 'next/head';
import LogInButton from "./Buttons/LogInButton";
import SignUpButton from "./Buttons/SignUpButton";
import Footer from "./Footer/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>ホーム画面</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        direction="column"
        width="full"
        bgGradient="linear(to-r, rgba(255,0,0,0.1), rgba(0,0,255,0.1))"
        justify="center"
        align="center"
        minH={{ base: "90vh", md: "95vh" }}
      >
        <Box p={8} borderWidth="1px" borderRadius="lg" bg="white" boxSize={{ base: "340px", md: "350px" }}>
          <VStack spacing={6} align="stretch">
            <Center>
              <VStack>
                <HStack mb="4" spacing="-px">
                  <Heading color="red" fontSize="3xl">NEO</Heading><Heading color="cyan.500" fontSize="3xl">ダイエット</Heading>
                </HStack>
                <Text textAlign="center" fontSize="lg" mx="auto">
                  食事の画像が <b><Text color="red" style={{ display: 'inline' }}>赤</Text><Text color="blue" style={{ display: 'inline' }}>青</Text>画像</b> に!?
                </Text>
                <Text textAlign="center" fontSize="lg" mx="auto">
                  視覚から食欲を抑制する <p><b>新感覚</b> のダイエットアプリ</p>
                </Text>
              </VStack>
            </Center>
            <VStack>
              <SignUpButton />
              <LogInButton />
            </VStack>
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}