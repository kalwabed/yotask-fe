import { Flex } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<Flex as="main" w="100%" direction="column" h="100%">
					<Outlet />
				</Flex>
				<TanStackRouterDevtools />
			</>
		);
	},
});
