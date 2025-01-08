import { sessionState } from "@/libs/states";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Select,
  Text,
  VStack
} from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import axios from 'axios';
import { useAtom } from "jotai";
import { ChangeEvent, useState } from "react";
import Settings from './settings';

export default function App() {
  const [session] = useAtom<Session | null>(sessionState);
  const [file, setFile] = useState<File | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [filenameInput, setFilenameInput] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [selectedMode, onModeChange] = useState('color');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target && e.target.files) {
      const selectedFile = e.target.files[0]
      if (selectedFile) {
        setFile(selectedFile);
      } else {
        setError("有効な画像ファイルを選択してください");
      }
    };
  };

  const handleAllDelete = () => {
    setImageSrc(null)
    setMessage("")
  };

  const handleSaveImages = () => {
    const link = document.createElement('a');
    if (imageSrc) {
      link.href = imageSrc;
    } else {
      setError('入力が正しくありません');
    }
    link.download = filenameInput;
    link.click()
  };


  const handleUpload = async () => {
    setImageSrc(null)
    setMessage("")
    setError("");

    if (!file) {
      setError("画像が選択されていません");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_email", session?.user.user_metadata.email);

    if (selectedMode === 'color') {
      setIsLoading(true);
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/anaglyph", formData, {
          responseType: 'blob'
        });

        const url = URL.createObjectURL(response.data);

        setMessage("画像が生成されました");
        setImageSrc(url);
        setIsLoading(false)
      } catch (error) {
        setMessage("");
        setImageSrc(null);
        setError("画像の生成に失敗しました");
        console.error(error);
      }
    }
    else if (selectedMode === 'gray') {
      setIsLoading(true);
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/gray/anaglyph", formData, {
          responseType: 'blob'
        });

        const url = URL.createObjectURL(response.data);

        setMessage("画像が生成されました");
        setImageSrc(url);

      } catch (error) {
        setMessage("");
        setImageSrc(null);
        setError("画像の生成に失敗しました");
        console.error(error);
      }
    }
    setIsLoading(false)
  };

  return (
    <Box bg='white' overflowY="auto" bgGradient="linear(to-r, rgba(255,0,0,0.1), rgba(0,0,255,0.1))">
      <Box bg='white'>
        <Flex justifyContent='flex-end'>
          <Settings />
        </Flex>
      </Box>

      <Container>
        <Flex justify="center" align="center" minH="100vh">
          <Box p={50} borderWidth="1px" borderRadius='lg' overflowY="auto" bg="white">
            <Center>
              <VStack spacing={4} align="stretch" p={1}>
                <FormControl>
                  <FormLabel>
                    画像
                  </FormLabel>
                  <Input type="file" onChange={handleFileChange} mb={4} />

                  <FormLabel>種類</FormLabel>
                  <Select value={selectedMode} onChange={(e) => onModeChange(e.target.value)} mb={4}>
                    <option value='color'>カラー（赤青）</option>
                    <option value='gray'>グレー（赤青）</option>
                  </Select>
                </FormControl>
              </VStack>
            </Center>

            <VStack spacing={4} align="stretch" p={4}>
              <Button onClick={handleUpload} colorScheme="blue" mb={4} isLoading={isLoading}>
                作成
              </Button>
            </VStack>

            {error && <Text color='red'>{error}</Text>}
            {message && <Text mb={4}>{message}</Text>}
            {imageSrc &&
              <>
                <Center>
                  <Image boxSize="500px" src={imageSrc} width='auto' alt="アナグリフ画像" mb={4} />
                </Center>

                <FormControl>
                  <FormLabel aria-label="filename">ファイル名</FormLabel>
                  <Input
                    id="filename"
                    type="text"
                    value={filenameInput}
                    onChange={(e) => setFilenameInput(e.target.value)}
                    placeholder="sample"
                    mb={4}
                  />
                </FormControl>
                <Box display="flex" justifyContent="flex-end">
                  <HStack spacing={4} align="stretch">
                    <Button
                      onClick={handleSaveImages}
                      isDisabled={!filenameInput}
                      isLoading={isLoading}
                    >
                      保存
                    </Button>
                    <Button onClick={handleAllDelete}>削除</Button>
                  </HStack>
                </Box>
              </>}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
