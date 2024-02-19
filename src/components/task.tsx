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
import { format } from "@formkit/tempo";
import { useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { FiCheck, FiCheckSquare, FiSquare, FiStar } from "react-icons/fi";
import { currentTaskState } from "../store/task";
import { Task as TaskType } from "../types/task";
import TaskDrawer from "./task-drawer";

interface Props extends TaskType {}

const Task = (task: Props) => {
	const [status, setStatus] = useState<"pending" | "completed">(task.status);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const setCurrentTask = useSetAtom(currentTaskState);
	const btnRef = useRef(null);

	const MenuIcon = {
		pending: <FiSquare />,
		completed: <FiCheckSquare />,
	};

	function onOpenDrawer() {
		console.log(task);
		setCurrentTask(task);
		onOpen();
	}

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
				<IconButton
					icon={<FiStar />}
					aria-label="Task priority"
					variant="ghost"
					colorScheme="yellow"
				/>
			</Tooltip>
			<Button
				ref={btnRef}
				onClick={onOpenDrawer}
				variant="ghost"
				width="100%"
				fontWeight="normal"
			>
				<Text>{task.title}</Text>
				<Text ml="auto">{format(new Date(task.createdAt), "D MMM")}</Text>
			</Button>

			<TaskDrawer task={task} isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};

export default Task;
