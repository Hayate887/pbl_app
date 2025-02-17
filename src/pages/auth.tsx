import CreateImageButton from "@/pages/Buttons/CreateImageButton";
import MethodButton from "@/pages/Buttons/MethodButton";
import { Box, Flex, VStack } from "@chakra-ui/react";
import Head from "next/head";
import LogOutButton from "./Buttons/LogOutButton";
import Footer from "./Footer/footer";
import TermsOfUse from './Terms/TermsOfUse';

export default function Home() {
  return (
    <>
      <Head>
        <title>メイン画面</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex justify="center" align="center" minH={{ base: "90vh", md: "95vh" }} width="full" bgGradient="linear(to-r, rgba(255,0,0,0.1), rgba(0,0,255,0.1))">
        <Box p={50} borderWidth="1px" borderRadius='lg' bg="white">
          <VStack spacing={3} align="stretch">
            <CreateImageButton />
            <MethodButton />
            <TermsOfUse />
            <LogOutButton />
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}
