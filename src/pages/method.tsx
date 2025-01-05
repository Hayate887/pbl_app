import {
  Box, Button,
  Flex,
  Image,
  Stack, Text
} from '@chakra-ui/react';
import { useRouter } from "next/router";
import { useState } from 'react';

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
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" boxSize={{ base: "370px", md: "500px" }} bg="white">
    <Text fontWeight="bold" fontSize="xl">{title}</Text>
    <Text mt={5}>{content}</Text>
    <Image mt={4} src={imageUrl} alt={title} mb={4} />
  </Box>
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
    { title: 'ステップ 1', content: '「ファイルを選択」からアナグリフ画像にしたい画像を選択します（png, jpg, jpeg画像推奨）', imageUrl: '/images/step1.jpeg' },
    { title: 'ステップ 2', content: '「種類」から作成するアナグリフ画像の背景色を選びます', imageUrl: '/images/step2.jpeg' },
    { title: 'ステップ 3', content: '「生成」ボタンを押すとアナグリフ画像が表示されます', imageUrl: '/images/step3.jpeg' },
    { title: 'ここで一つ', content: '赤青メガネを通して見ると立体的に見えてくるかも...', imageUrl: '/images/step3.jpeg' },
    { title: 'ステップ 4', content: 'ファイル名を入力して「保存」ボタンを押すと作成したアナグリフ画像が.png画像として保存され、「削除」ボタンを押すと削除されます', imageUrl: '/images/step4.jpeg' },
    { title: 'さいごに', content: '左上のボタンから「アプリの使用方法」, 「利用規約」, 「ログアウト」を選択することができます', imageUrl: '/images/step0.jpeg' },
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bgGradient="linear(to-r, rgba(255,0,0,0.1), rgba(0,0,255,0.1))">
      <Box p={50}>
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
  );
}
