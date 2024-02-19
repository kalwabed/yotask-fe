import { Button, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi2";
import ModalNewTask from "./modal-new-task";

const TasksEmptyState = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<VStack justify="center">
			<Text>Currently empty. Want to add a new one?</Text>
			<Button colorScheme="pink" onClick={onOpen} leftIcon={<HiPlus />}>
				New task
			</Button>
			<ModalNewTask isOpen={isOpen} onClose={onClose} />
		</VStack>
	);
};

export default TasksEmptyState;
