import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";


export default function CrateImageButton() {
  const router = useRouter();

  return (
    <>
      <Button
        colorScheme="black"
        variant='link'
        onClick={() => router.push("/image")}
      >
        <Text size='lg'>画像作成</Text>
      </Button>
    </>
  );
}

