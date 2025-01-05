import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";


export default function CrateImageButton() {
  const router = useRouter();

  return (
    <>
      <Button
        colorScheme="black"
        variant='link'
        onClick={() => router.push("/method")}
      >
        <Text size='lg'>アプリの使用方法</Text>
      </Button>
    </>
  );
}
