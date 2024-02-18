import { Container, Grid } from "@chakra-ui/react";
import PageHeader from "./page-header";
import Task from "./task";

const HomePage = () => {
	return (
		<Container maxW="container.md" mt={8}>
			<PageHeader />
			<Grid mt={12} templateColumns="repeat(1, 1fr)" gap={8}>
				<Task />
			</Grid>
		</Container>
	);
};

export default HomePage;
