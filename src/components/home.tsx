import { Container, Grid } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { getTasksAtom } from "../store/task";
import PageHeader from "./page-header";
import Task from "./task";
import TasksEmptyState from "./tasks-empty-state";

const HomePage = () => {
	const [{ data: tasks }] = useAtom(getTasksAtom);

	return (
		<Container maxW="container.md" mt={8}>
			<PageHeader />
			<Grid
				mt={12}
				templateColumns="repeat(1, 1fr)"
				gap={4}
				bgColor="gray.50"
				p={2}
				border="1px solid"
				borderColor="gray.200"
				rounded="sm"
			>
				{tasks?.map((task) => (
					<Task key={task._id} {...task} />
				))}
				{tasks?.length === 0 && <TasksEmptyState />}
			</Grid>
		</Container>
	);
};

export default HomePage;
