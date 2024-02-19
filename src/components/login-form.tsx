import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Text,
} from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import cookie from "js-cookie";
import ky from "ky";
import { useForm } from "react-hook-form";
import { loginState } from "../store/auth";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ username: string; password: string }>();
	const setUserLoginState = useSetAtom(loginState);

	const login = async (data: { username: string; password: string }) => {
		try {
			const userLogin: { access_token: string } = await ky
				.post("auth/login", {
					prefixUrl: import.meta.env.VITE_SERVER_URL,
					json: {
						username: data.username,
						password: data.password,
					},
				})
				.json();

			cookie.set("access_token", userLogin.access_token, { expires: 4 });
			location.reload();
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Flex direction="column" gap={4}>
			<Heading as="h1">Welcome to YoTask</Heading>
			<Text>Please login to proceed</Text>
			<Flex as="form" onSubmit={handleSubmit(login)} direction="column" gap={8}>
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
				<Flex gap={2}>
					<Text>Don't have an account?</Text>{" "}
					<Button
						onClick={() => setUserLoginState("signup")}
						colorScheme="blue"
						variant="link"
					>
						Sign up
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default LoginForm;
