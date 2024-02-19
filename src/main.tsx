import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { queryClientAtom } from "jotai-tanstack-query";
import { Provider } from "jotai/react";
import { useHydrateAtoms } from "jotai/react/utils";
import {StrictMode, ReactNode } from "react";
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

const queryClient = new QueryClient();

const HydrateAtoms = ({ children }: {children: ReactNode}) => {
	useHydrateAtoms([[queryClientAtom, queryClient]]);
	return children;
};

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ChakraProvider>
				<QueryClientProvider client={queryClient}>
					<Provider>
						<HydrateAtoms>
							<RouterProvider router={router} />
						</HydrateAtoms>
					</Provider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ChakraProvider>
		</StrictMode>,
	);
}
