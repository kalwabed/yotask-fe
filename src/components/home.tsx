import { Container, Grid } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { getTasksAtom } from "../store/task";
import PageHeader from "./page-header";
import Task from "./task";

const HomePage = () => {
	const [{ data: tasks }] = useAtom(getTasksAtom);

	return (
		<Container maxW="container.md" mt={8}>
			<PageHeader />
			<Grid mt={12} templateColumns="repeat(1, 1fr)" gap={4}>
				{tasks?.map((task) => (
					<Task key={task._id} {...task} />
				))}
			</Grid>
		</Container>
	);
};

export default HomePage;
