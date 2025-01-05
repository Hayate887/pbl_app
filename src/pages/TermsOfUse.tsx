import {
    Button,
    Link,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    UnorderedList,
    useDisclosure
} from "@chakra-ui/react";

export default function TermsOfService() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                onClick={onOpen}
                colorScheme="black"
                variant='link'>
                利用規約
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>利用規約</ModalHeader>
                    <ModalCloseButton />
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
                            <ListItem mt="2" mb="2">
                                <Text>本アプリケーションは<Link href="https://github.com/Hayate887/pbl_app/blob/main/LICENSE" isExternal>MITライセンス</Link>を使用しています</Text>
                            </ListItem>
                        </UnorderedList>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}