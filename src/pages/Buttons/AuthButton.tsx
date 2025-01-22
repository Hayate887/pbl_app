import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";


export default function CrateImageButton() {
    const router = useRouter();

    return (
        <>
            <Button
                colorScheme="black"
                variant='link'
                onClick={() => router.push("/auth")}
            >
                <Text size='lg'>メイン画面に戻る</Text>
            </Button>
        </>
    );
}

