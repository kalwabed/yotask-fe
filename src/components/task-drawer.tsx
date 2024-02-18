import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
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
	Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiCheck, FiCheckSquare, FiSquare, FiStar } from "react-icons/fi";

interface Props {
	isOpen: boolean
	onClose: () => void
}

const TaskDrawer = (props: Props) => {
	const [status, setStatus] = useState<"pending" | "completed">("pending");
	const { isOpen, onClose } = props;
	const btnRef = useRef(null);

	const MenuIcon = {
		pending: <FiSquare />,
		completed: <FiCheckSquare />,
	};

	return (
		<Drawer isOpen={isOpen} size="md" onClose={onClose} finalFocusRef={btnRef}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Update task</DrawerHeader>

				<DrawerBody>
					<Stack gap={8}>
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
							<Button variant="ghost" leftIcon={<FiStar />} width="fit-content">
								Priority
							</Button>
						</HStack>
						<Input variant="flushed" placeholder="e.g Laundry" size="lg" />
						<Textarea placeholder="Bring laundry to Minna's place at 8 o'clock" />
					</Stack>
				</DrawerBody>
				<DrawerFooter>
					<Button variant="outline" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button colorScheme="blue">Save</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default TaskDrawer;
