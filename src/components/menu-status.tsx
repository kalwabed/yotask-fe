import {
	Button,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import {
	FiCheck,
	FiCheckSquare,
	FiMoreHorizontal,
	FiSquare,
} from "react-icons/fi";
import { Status } from "../types/task";
import { MenuIcon } from "./task";

interface Props {
	status: Status;
	setStatus: (status: Status) => void;
}

const MenuStatus = (props: Props) => {
	const { status, setStatus } = props;

	return (
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
	);
};

export default MenuStatus;
