import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import cookie from "js-cookie";
import ky, { HTTPError } from "ky";
import { useForm } from "react-hook-form";
import { loginState } from "../store/auth";

interface SignupForm {
	username: string;
	password: string;
	repeatPassword: string;
	email: string;
}

const SignupForm = () => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<SignupForm>();
	const setUserLoginState = useSetAtom(loginState);
	const toast = useToast();

	const login = async (data: SignupForm) => {
		try {
			const userSignup: { access_token: string } = await ky
				.post("auth/signup", {
					prefixUrl: import.meta.env.VITE_SERVER_URL,
					json: data,
				})
				.json();

			cookie.set("access_token", userSignup.access_token, { expires: 4 });
			location.reload();
		} catch (err) {
			const error: { message: string } = await (err as HTTPError).response.json();
			toast({
				title: "Failed to sign up",
				description: error.message,
				status: "error",
				position: "top",
			});

			console.error(error);
		}
	};
	return (
		<Flex direction="column" gap={4}>
			<Heading as="h1">Sign up to YoTask</Heading>
			<Text>Sign up to enjoy YoTask's wide range of features</Text>
			<Flex as="form" onSubmit={handleSubmit(login)} direction="column" gap={8}>
				<FormControl isRequired isInvalid={Boolean(errors.username)}>
					<FormLabel>Username</FormLabel>
					<Input
						{...register("username", {
							required: "Username is required",
							pattern: {
								value: /^[a-zA-Z0-9_-]+$/,
								message: "Username is not valid",
							},
						})}
					/>
					{errors.username && (
						<FormErrorMessage>{errors.username.message}</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isRequired isInvalid={Boolean(errors.email)}>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						{...register("email", {
							required: "Email is required",
							pattern: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
						})}
					/>
					{errors.email && (
						<FormErrorMessage>{errors.email.message}</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isRequired isInvalid={Boolean(errors.password)}>
					<FormLabel>Password</FormLabel>
					<Input
						type="password"
						{...register("password", { required: true })}
					/>
					{errors.password && (
						<FormErrorMessage>Password is required.</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={Boolean(errors.repeatPassword)}>
					<FormLabel>Repeat password</FormLabel>
					<Input
						type="password"
						{...register("repeatPassword", {
							required: "Repeat password is required",
							validate: (rPass) =>
								rPass === getValues("password") || "Password do not match",
						})}
					/>
					{errors.repeatPassword && (
						<FormErrorMessage>
							{errors.repeatPassword?.message}
						</FormErrorMessage>
					)}
				</FormControl>
				<Button type="submit" colorScheme="teal">
					Login
				</Button>
				<Flex gap={2}>
					<Text>Already have an account?</Text>{" "}
					<Button
						onClick={() => setUserLoginState("login")}
						colorScheme="blue"
						variant="link"
					>
						Login
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default SignupForm;
