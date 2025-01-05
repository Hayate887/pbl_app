import { Button, useDisclosure } from "@chakra-ui/react";

import AuthModal from "../AuthModal/SignInAuthModal";

export default function LogInButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        w="100%"
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          onOpen();
        }}
      >
        サインイン
      </Button>
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

