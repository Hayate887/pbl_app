import supabase from "@/libs/supabase";
import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Text,
    useToast
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import ServiceRule from "../Terms/TermsOfService";

export interface AuthFormProps {
    onClose: () => void;
}

export default function AuthForm({ onClose }: AuthFormProps) {
    const router = useRouter();
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    async function handleSignUp() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: username,
                },
            },
        });
        setLoading(false);

        if (error) {
            toast({
                title: "Sign up failed",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            onClose();
            return;
        }
        onClose();
        router.push("/auth");
    }

    return (
        <>
            <ServiceRule />
            <FormControl isInvalid={!!username && username.length < 1}>
                <FormLabel>ユーザー名</FormLabel>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                />
                <FormHelperText>ユーザー名を入力してください</FormHelperText>
            </FormControl>
            <FormControl mt="4" isInvalid={!!email && !emailRegex.test(email)}>
                <FormLabel>メールアドレス</FormLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@sample.com"
                />
                {!email || emailRegex.test(email) ? (
                    <FormHelperText>メールアドレスを入力してください</FormHelperText>
                ) : (
                    <FormErrorMessage>入力に誤りがあります</FormErrorMessage>
                )}
            </FormControl>
            <FormControl mt="4" isInvalid={!!password && password.length < 8}>
                <FormLabel>パスワード</FormLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                />
                {!password || password.length >= 8 ? (
                    <FormHelperText>パスワードを入力してください</FormHelperText>
                ) : (
                    <FormErrorMessage>
                        8文字以上を入力してください
                    </FormErrorMessage>
                )}
            </FormControl>
            <Button
                mt="4"
                w="100%"
                colorScheme="blue"
                onClick={handleSignUp}
                isDisabled={
                    !username ||
                    !email ||
                    !password ||
                    username.length < 1 ||
                    !emailRegex.test(email) ||
                    password.length < 8
                }
                isLoading={loading}
            >
                登録
            </Button>
            <Divider mt="4" />
            <Flex>
                <Button
                    mt="4"
                    w="100%"
                    aria-label="github"
                    onClick={() => supabase.auth.signInWithOAuth({ provider: "github" })}
                >
                    <FaGithub />
                    <Text p={4}>GitHubアカウントで新規登録</Text>
                </Button>
            </Flex>
        </>
    );
}