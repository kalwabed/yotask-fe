import { Container, Grid } from "@chakra-ui/react";
import { Task as TaskType } from "../types/task";
import PageHeader from "./page-header";
import Task from "./task";

const dummyTask: TaskType = {
	_id: "123",
	title: "Judulnya apa ya",
	desc: "halo",
	priority: true,
	status: "completed",
	createdAt: new Date().toString(),
};

const HomePage = () => {
	return (
		<Container maxW="container.md" mt={8}>
			<PageHeader />
			<Grid mt={12} templateColumns="repeat(1, 1fr)" gap={8}>
				<Task {...dummyTask} />
			</Grid>
		</Container>
	);
};

export default HomePage;
