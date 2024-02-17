import {
	Avatar,
	Button,
	Container,
	Flex,
	Heading,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import cookie from "js-cookie";
import { authState } from "../store/auth";

const HomePage = () => {
	const auth = useAtomValue(authState);

	function logout() {
		cookie.remove("access_token");
		location.reload();
	}

	return (
		<Container maxW="container.md" mt={8}>
			<Flex
				bgColor="blue.100"
				py={2}
				px={4}
				border="1px solid"
				borderColor="blue.200"
				rounded="md"
				align="center"
			>
				<Heading size="md">YoTask</Heading>
				<Spacer />
				<Flex>
					<Menu isLazy>
						<MenuButton as={Button} size="sm" variant="ghost">
							<Flex align="center" gap={2}>
								<span>{auth.user.username}</span>
								<Avatar size="xs" name={auth.user.username} />
							</Flex>
						</MenuButton>
						<MenuList>
							<MenuItem onClick={logout} color="red">
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
		</Container>
	);
};

export default HomePage;
