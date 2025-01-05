import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import AuthForm from "./RegisterAuthForm";

export interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>認証</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AuthForm onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}