import {
    Box,
    Button,
    Checkbox,
    FormControl,
    Link,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    UnorderedList
} from '@chakra-ui/react';
import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';

const modalShownAtom = atom(true);

export default function ServiceRule() {
    const [hasShownModal, setHasShownModal] = useAtom(modalShownAtom);
    const [agreed, setAgreed] = useState(false);
    const router = useRouter();

    const handleClose = () => {
        if (agreed) {
            setHasShownModal(false);
        }
    };


    return (
        <>
            <Modal isOpen={hasShownModal} onClose={handleClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>利用規約</ModalHeader>
                    <ModalCloseButton onClick={() => router.reload()} />
                    <ModalBody>
                        <UnorderedList>
                            <ListItem>
                                <Text>当サービスでは、生成されたアナグリフ画像を最長30日間保存いたします</Text>
                            </ListItem>
                            <ListItem mt="2">
                                <Text>保存期間中、画像は著作権や肖像権を侵害していないかを管理者によって確認される場合があります</Text>
                            </ListItem>
                            <ListItem mt="2">
                                <Text>万が一生成された画像が権利侵害にあたる場合、当該アカウントの停止措置が取られる場合があります</Text>
                            </ListItem>
                            <ListItem mt="2">
                                <Text>なお、保存期間終了から画像が削除されるまでの間に、保存された画像がユーザーの同意無しに使用されることはありません</Text>
                            </ListItem>
                            <ListItem mt="2">
                                <Text>本アプリケーションは<Link href="https://github.com/Hayate887/pbl_app/blob/main/LICENSE" isExternal>MITライセンス</Link>を使用しています</Text>
                            </ListItem>
                        </UnorderedList>
                        <FormControl mt={4}>
                            <Checkbox isChecked={agreed} onChange={(e) => setAgreed(e.target.checked)}>
                                同意する
                            </Checkbox>
                        </FormControl>
                        <Box display="flex" justifyContent="flex-end">
                            <Button onClick={handleClose} isDisabled={!agreed} mt={4}>
                                閉じる
                            </Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}