import {
	Button,
	FormControl,
	FormErrorMessage,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createTaskAtom } from "../store/task";
import { Status, Task } from "../types/task";
import MenuStatus from "./menu-status";
import PriorityButton from "./priority-btn";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const ModalNewTask = (props: Props) => {
	const { isOpen, onClose } = props;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Partial<Task>>();
	const [status, setStatus] = useState<Status>("pending");
	const [priority, setPriority] = useState<boolean>(false);
	const { mutateAsync } = useAtomValue(createTaskAtom);
	const queryClient = useQueryClient();

	async function onSubmit(data: Partial<Task>) {
		await mutateAsync({ ...data, priority, status });
		queryClient.invalidateQueries({ queryKey: ["tasks"] });
		onClose();
		reset();
		setStatus("pending");
		setPriority(false);
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>New task</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<VStack align="start" gap={4}>
						<FormControl isInvalid={Boolean(errors.title)} isRequired>
							<Input
								variant="flushed"
								placeholder="e.g Riding"
								{...register("title", { required: true })}
							/>
							{errors.title && (
								<FormErrorMessage>Title is required.</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(errors.desc)}>
							<Textarea
								placeholder="e.g Call Andy at 8"
								{...register("desc")}
							/>
						</FormControl>
						<HStack gap={8}>
							<MenuStatus status={status} setStatus={setStatus} />
							<PriorityButton priority={priority} setPriority={setPriority} />
						</HStack>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button variant="outline" mr={4} onClick={onClose}>
						Close
					</Button>
					<Button
						type="submit"
						onClick={handleSubmit(onSubmit)}
						colorScheme="blue"
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ModalNewTask;
