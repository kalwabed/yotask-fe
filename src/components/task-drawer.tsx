import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	HStack,
	Icon,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { format } from "@formkit/tempo";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
	FiCheck,
	FiCheckSquare,
	FiMoreHorizontal,
	FiSquare,
} from "react-icons/fi";
import { HiMiniStar } from "react-icons/hi2";
import { useDebounce } from "react-use";
import { updateTaskAtom } from "../store/task";
import { Status, Task } from "../types/task";
import { MenuIcon } from "./task";

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
	const { mutateAsync } = useAtomValue(updateTaskAtom);
	const queryClient = useQueryClient();
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
			await mutateAsync({
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
							<Menu>
								<MenuButton
									as={Button}
									variant="ghost"
									leftIcon={MenuIcon[status]}
									textTransform="capitalize"
									width="fit-content"
								>
									{status}
								</MenuButton>
								<MenuList>
									<MenuItem onClick={() => setStatus("pending")}>
										<Icon as={FiMoreHorizontal} mr="12px" />
										Pending
										{status === "pending" && (
											<Icon as={FiCheck} height="13px" width="13px" ml="auto" />
										)}
									</MenuItem>
									<MenuItem onClick={() => setStatus("progress")}>
										<Icon as={FiSquare} mr="12px" />
										In Progress
										{status === "progress" && (
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
							<Button
								variant="ghost"
								leftIcon={<HiMiniStar />}
								colorScheme={priority ? "yellow" : "gray"}
								onClick={() => setPriority((prev) => !prev)}
								width="fit-content"
							>
								Priority
							</Button>
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
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default TaskDrawer;
