import { createRootRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { authState } from "../store/auth";
import LoginModal from "../components/login-modal";

export const Route = createRootRoute({
	component: () => {
		const auth = useAtomValue(authState);

		if (!auth.accessToken) {
			return <LoginModal />
		}

		return <>hello</>;
	},
});
