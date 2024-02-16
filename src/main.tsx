import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<ChakraProvider>
				<RouterProvider router={router} />
			</ChakraProvider>
		</React.StrictMode>,
	);
}
