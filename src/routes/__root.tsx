import { Flex } from "@chakra-ui/react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="p-2 flex gap-2">
				<Link to="/">Home</Link> <Link to="/login">Login</Link>
			</div>
			<hr />
			<Flex as="main" w="100%" direction="column" h="100%">
				<Outlet />
			</Flex>
			<TanStackRouterDevtools />
		</>
	),
});
