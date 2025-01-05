import { SettingsIcon } from '@chakra-ui/icons';
import {
    Button,
    Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay,
    ListItem,
    UnorderedList,
    useDisclosure
} from "@chakra-ui/react";
import LogOutButton from './Buttons/LogOutButton';
import MethodButton from './Buttons/MethodButton';
import TermsOfUse from './TermsOfUse';

export default function SettingButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button position="absolute" top='3' left="3" onClick={onOpen}>
                <SettingsIcon />
            </Button>

            <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader mb="4"> メニュー</DrawerHeader>
                    <DrawerBody>
                        <UnorderedList>
                            <ListItem>
                                <MethodButton />
                            </ListItem>
                            <ListItem mt="4">
                                <TermsOfUse />
                            </ListItem>
                            <ListItem mt="4">
                                <LogOutButton />
                            </ListItem>
                        </UnorderedList>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}