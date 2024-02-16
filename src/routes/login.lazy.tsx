import {
	Button,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Text,
} from "@chakra-ui/react";
import { createRootRoute } from "@tanstack/react-router";
import ky from "ky";
import { useForm } from "react-hook-form";

export const Route = createRootRoute({
	component: () => {
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm<{ username: string; password: string }>();

		const login = async (data: { username: string; password: string }) => {
			try {
				const userLogin = await ky
					.post("http://localhost:8000/auth/login", {
						json: {
							username: data.username,
							password: data.password,
						},
					})
					.json();

				console.log(userLogin);
			} catch (err) {
				console.error(err);
			}
		};
		return (
			<Container mt={12}>
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
			</Container>
		);
	},
});
