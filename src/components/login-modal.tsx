import {
	Button,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import ky from "ky";
import { useForm } from "react-hook-form";
import { authState } from "../store/auth";

const LoginModal = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ username: string; password: string }>();
	const setAuth = useSetAtom(authState);
	const { onClose } = useDisclosure()

	const login = async (data: { username: string; password: string }) => {
		try {
			const userLogin: { access_token: string } = await ky
				.post("http://localhost:8000/auth/login", {
					json: {
						username: data.username,
						password: data.password,
					},
				})
				.json();

			setAuth({ accessToken: userLogin.access_token });
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Container mt={12}>
			<Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalBody>
						<Flex direction="column" gap={4}>
							<Heading as="h1">Welcome to YoTask</Heading>
							<Text>Please login to proceed</Text>
							<Flex
								as="form"
								onSubmit={handleSubmit(login)}
								direction="column"
								gap={8}
							>
								<FormControl isInvalid={Boolean(errors.username)}>
									<FormLabel>Username</FormLabel>
									<Input {...register("username", { required: true })} />
									{errors.username && (
										<FormErrorMessage>Username is required.</FormErrorMessage>
									)}
								</FormControl>
								<FormControl isInvalid={Boolean(errors.password)}>
									<FormLabel>Password</FormLabel>
									<Input
										type="password"
										{...register("password", { required: true })}
									/>
									{errors.password && (
										<FormErrorMessage>Password is required.</FormErrorMessage>
									)}
								</FormControl>
								<Button type="submit" colorScheme="teal">
									Login
								</Button>
							</Flex>
						</Flex>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
		</Container>
	);
};

export default LoginModal;
