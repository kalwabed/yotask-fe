import {
	Button,
	Flex,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiCheck, FiCheckSquare, FiSquare, FiStar } from "react-icons/fi";
import TaskDrawer from "./task-drawer";

const Task = () => {
	const [status, setStatus] = useState<"pending" | "completed">("pending");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef(null);

	const MenuIcon = {
		pending: <FiSquare />,
		completed: <FiCheckSquare />,
	};

	return (
		<Flex align="center">
			<Menu>
				<Tooltip hasArrow label="Status">
					<MenuButton
						as={IconButton}
						variant="ghost"
						isRound
						icon={MenuIcon[status]}
						aria-label="Status button"
					/>
				</Tooltip>
				<MenuList>
					<MenuItem onClick={() => setStatus("pending")}>
						<Icon as={FiSquare} mr="12px" />
						Pending
						{status === "pending" && (
							<Icon as={FiCheck} height="13px" width="13px" ml="auto" />
						)}
					</MenuItem>
					<MenuItem onClick={() => setStatus("completed")}>
						<Icon as={FiCheckSquare} mr="12px" />
						Completed
						{status === "completed" && (
							<Icon as={FiCheck} height="13px" width="13px" ml="auto" />
						)}
					</MenuItem>
				</MenuList>
			</Menu>
			<Tooltip hasArrow label="Priority">
				<IconButton icon={<FiStar />} aria-label="Task priority" variant="ghost" colorScheme="yellow" />
			</Tooltip>
			<Button
				ref={btnRef}
				onClick={onOpen}
				variant="ghost"
				width="100%"
				fontWeight="normal"
			>
				<Text>Judulnya apa ya</Text>
				<Text ml="auto">11 Feb</Text>
			</Button>

			<TaskDrawer isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};

export default Task;
