import {
	Avatar,
	Button,
	Flex,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import cookie from "js-cookie";
import { HiPlus } from "react-icons/hi2";
import { authState } from "../store/auth";
import ModalNewTask from "./modal-new-task";

const PageHeader = () => {
	const auth = useAtomValue(authState);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function logout() {
		cookie.remove("access_token");
		location.reload();
	}

	return (
		<Flex rounded="md" align="center">
			<Heading size="md">YoTask</Heading>
			<Spacer />
			<Flex align="center">
				<Tooltip label="Add new task">
					<IconButton
						icon={<HiPlus />}
						isRound
						aria-label="Add new task"
						variant="ghost"
						onClick={onOpen}
					/>
				</Tooltip>
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

			<ModalNewTask isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};

export default PageHeader;
