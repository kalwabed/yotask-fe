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
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import {
	FiCheck,
	FiCheckSquare,
	FiMoreHorizontal,
	FiSquare,
	FiStar,
} from "react-icons/fi";
import { currentTaskState, updateTaskAtom } from "../store/task";
import { Status, Task as TaskType } from "../types/task";
import TaskDrawer from "./task-drawer";

interface Props extends TaskType {}

export const MenuIcon = {
	pending: <FiMoreHorizontal />,
	progress: <FiSquare />,
	completed: <FiCheckSquare />,
};

const Task = (task: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const setCurrentTask = useSetAtom(currentTaskState);
	const btnRef = useRef(null);
	const { mutateAsync } = useAtomValue(updateTaskAtom);
	const queryClient = useQueryClient();

	function onOpenDrawer() {
		setCurrentTask(task);
		onOpen();
	}

	async function updateStatus(currentStatus: Status) {
		await mutateAsync({ _id: task._id, status: currentStatus });
		await queryClient.invalidateQueries({ queryKey: ["tasks"] });
	}

	async function updatePriority() {
		await mutateAsync({ _id: task._id, priority: !task.priority });
		await queryClient.invalidateQueries({ queryKey: ["tasks"] });
	}

	return (
		<Flex align="center">
			<Menu>
				<Tooltip hasArrow label="Status">
					<MenuButton
						as={IconButton}
						variant="ghost"
						isRound
						icon={MenuIcon[task.status]}
						aria-label="Status button"
					/>
				</Tooltip>
				<MenuList>
					<MenuItem onClick={() => updateStatus("pending")}>
						<Icon as={FiMoreHorizontal} mr="12px" />
						Pending
						{task.status === "pending" && (
							<Icon as={FiCheck} height="13px" width="13px" ml="auto" />
						)}
					</MenuItem>
					<MenuItem onClick={() => updateStatus("progress")}>
						<Icon as={FiSquare} mr="12px" />
						In Progress
						{task.status === "progress" && (
							<Icon as={FiCheck} height="13px" width="13px" ml="auto" />
						)}
					</MenuItem>
					<MenuItem onClick={() => updateStatus("completed")}>
						<Icon as={FiCheckSquare} mr="12px" />
						Completed
						{task.status === "completed" && (
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
					colorScheme={task.priority ? "yellow" : "gray"}
					onClick={updatePriority}
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
				<Tooltip
					label={format(new Date(task.createdAt), {
						date: "long",
						time: "long",
					})}
				>
					<Text ml="auto">{format(new Date(task.createdAt), "D MMM")}</Text>
				</Tooltip>
			</Button>

			<TaskDrawer task={task} isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};

export default Task;
