import {
	Container,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { loginState } from "../store/auth";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";

const LoginModal = () => {
	const { onClose } = useDisclosure();
	const userState = useAtomValue(loginState);

	return (
		<Container mt={12}>
			<Modal isOpen={true} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader />
					<ModalBody>
						{userState === "login" ? <LoginForm /> : <SignupForm />}
					</ModalBody>

					<ModalFooter />
				</ModalContent>
			</Modal>
		</Container>
	);
};

export default LoginModal;
