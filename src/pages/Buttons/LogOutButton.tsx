import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import supabase from "@/libs/supabase";

export default function LogOutButton() {
  const router = useRouter();

  return (
    <>
      <Button

        colorScheme="black"
        variant='link'
        onClick={() => {
          supabase.auth.signOut();
          router.push("/");
        }}
      >
        <Text size="lg">ログアウト</Text>
      </Button>
    </>
  );
}


