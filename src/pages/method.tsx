import {
  Box, Button,
  Center,
  Flex,
  Image,
  Stack, Text
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from "next/router";
import { useState } from 'react';
import Footer from "./Footer/footer";

interface CardProps {
  title: string;
  content: string;
  imageUrl: string;
}

interface ProgressDotsProps {
  current: number;
  total: number;
}


const Card = ({ title, content, imageUrl }: CardProps) => (
  <Flex justify="center" align="center">
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" boxSize={{ base: "375px", md: "400px" }} bg="white" position="relative">
      <Text fontWeight="bold" fontSize="xl">{title}</Text>
      <Text mt={5}>{content}</Text>
      <Center>
        <Image mt={5} src={imageUrl} alt={title} mb={3} boxSize={{ base: "205px", md: "255px" }} width='auto' />
      </Center>
    </Box>
  </Flex>
);

const ProgressDots = ({ current, total }: ProgressDotsProps) => (
  <Flex mt={4} justify="center">
    {[...Array(total)].map((_, index) => (
      <Box
        key={index}
        w={3}
        h={3}
        mx={1}
        borderRadius="full"
        bg={index === current ? 'blue.500' : 'gray.300'}
      />
    ))}
  </Flex>
);

export default function App() {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const router = useRouter();

  const cards: CardProps[] = [
    { title: 'ステップ 1', content: '「画像」から食事の画像を選択します（人物の顔以外, png, jpg, jpeg画像推奨）', imageUrl: '/images/step1.jpeg' },
    { title: 'ステップ 2', content: '「種類」から作成する画像の背景色を選びます', imageUrl: '/images/step2.jpeg' },
    { title: 'ステップ 3', content: '作成ボタンを押すと作成された画像が表示されます', imageUrl: '/images/step3.jpeg' },
    { title: 'ここで一つ', content: '赤青メガネを使うと立体的に見えるかもしれません', imageUrl: '/images/step3.jpeg' },
    { title: 'ステップ 4', content: 'ファイル名を入力して「保存」ボタンを押すと, 作成した画像がpng画像として保存されます', imageUrl: '/images/step3.jpeg' },
    { title: 'さいごに', content: '左上のボタンから「アプリの使用方法」, 「利用規約」, 「ログアウト」を選択できます', imageUrl: '/images/step0.jpeg' },
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <>
      <Head>
        <title>使用方法</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex justify="center" align="center" minH={{ base: "90vh", md: "95vh" }} bgGradient="linear(to-r, rgba(255,0,0,0.1), rgba(0,0,255,0.1))">
        <Box p={30}>
          <Stack spacing={5} align="center" p={5}>
            <Card title={cards[currentCard].title} content={cards[currentCard].content} imageUrl={cards[currentCard].imageUrl} />
            <Flex>
              {currentCard === 0 && (
                <>
                  <Button
                    mr={4}
                    onClick={() => router.push("/auth")}
                  >
                    戻る
                  </Button>
                </>
              )}
              <Button onClick={prevCard} mr={4} display={currentCard === 0 ? 'none' : 'flex'}>前へ</Button>
              <Button onClick={nextCard} display={currentCard === cards.length - 1 ? 'none' : 'flex'}>次へ</Button>
              {currentCard === cards.length - 1 && (
                <>
                  <Button
                    onClick={() => router.push("/image")}
                  >
                    終了
                  </Button>
                </>
              )}
            </Flex>
            <ProgressDots current={currentCard} total={cards.length} />
          </Stack>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}
