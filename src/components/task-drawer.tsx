import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	HStack,
	IconButton,
	Input,
	Spacer,
	Stack,
	Text,
	Textarea,
	Tooltip,
	useToast,
} from "@chakra-ui/react";
import { format } from "@formkit/tempo";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { useDebounce } from "react-use";
import { removeTaskAtom, updateTaskAtom } from "../store/task";
import { Status, Task } from "../types/task";
import MenuStatus from "./menu-status";
import PriorityButton from "./priority-btn";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	task: Task;
}

const TaskDrawer = (props: Props) => {
	const { isOpen, onClose, task } = props;
	const [status, setStatus] = useState<Status>(task.status);
	const [priority, setPriority] = useState<boolean>(task.priority);
	const btnRef = useRef(null);
	const { mutateAsync: updateTask } = useAtomValue(updateTaskAtom);
	const { mutateAsync: removeTask } = useAtomValue(removeTaskAtom);
	const queryClient = useQueryClient();
	const toast = useToast();
	const { register, watch, getValues } = useForm<{
		title: string;
		desc: string;
	}>({
		defaultValues: {
			title: task.title,
			desc: task.desc,
		},
	});

	const [, cancel] = useDebounce(
		async () => {
			await updateTask({
				_id: task._id,
				priority,
				status,
				title: getValues("title"),
				desc: getValues("desc"),
			});
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
		500,
		[watch("title"), watch("desc"), status, priority],
	);

	async function handleRemoveTask() {
		await removeTask(task._id);
		toast({
			title: "Task removed",
			description: "We've removed the task.",
			status: "success",
			position: "top",
		});
		queryClient.invalidateQueries({ queryKey: ["tasks"] });
		onClose();
	}

	useEffect(() => {
		cancel();
	}, [cancel]);

	return (
		<Drawer isOpen={isOpen} size="md" onClose={onClose} finalFocusRef={btnRef}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Update task</DrawerHeader>

				<DrawerBody>
					<Stack mb={6} gap={8}>
						<HStack>
							<MenuStatus status={status} setStatus={setStatus} />
							<PriorityButton priority={priority} setPriority={setPriority} />
							<Spacer />
						</HStack>
						<Input
							variant="flushed"
							placeholder="e.g Laundry"
							size="lg"
							{...register("title")}
						/>
						<Textarea
							placeholder="Bring laundry to Minna's place at 8 o'clock"
							{...register("desc")}
						/>
					</Stack>
					<Text as="small" color="gray.500">
						Last update:{" "}
						{format(new Date(task.updatedAt), {
							date: "medium",
							time: "medium",
						})}
					</Text>
					<Tooltip label="Remove task" hasArrow>
						<IconButton
							onClick={handleRemoveTask}
							ml={4}
							size="sm"
							colorScheme="red"
							variant="ghost"
							icon={<FiTrash />}
							aria-label="Remove task"
						/>
					</Tooltip>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default TaskDrawer;
