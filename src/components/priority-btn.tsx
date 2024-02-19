import { Button } from "@chakra-ui/react";
import { HiMiniStar } from "react-icons/hi2";

interface Props {
	priority: boolean;
	setPriority: (prior: (prev: boolean) => boolean) => void;
}

const PriorityButton = (props: Props) => {
	const { priority, setPriority } = props;

	return (
		<Button
			variant="ghost"
			leftIcon={<HiMiniStar />}
			colorScheme={priority ? "yellow" : "gray"}
			onClick={() => setPriority((prev: boolean) => !prev)}
			width="fit-content"
		>
			Priority
		</Button>
	);
};

export default PriorityButton;
