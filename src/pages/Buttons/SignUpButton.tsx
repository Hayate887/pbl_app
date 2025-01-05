import { Button, useDisclosure } from "@chakra-ui/react";
import AuthModal from "../AuthModal/RegisterAuthModal";

export default function LogInButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                w="100%"
                colorScheme="blue"
                onClick={() => {
                    onOpen();
                }}
            >
                新規登録
            </Button>
            <AuthModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}

