import { createRootRoute } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import HomePage from "../components/home";
import LoginModal from "../components/login-modal";
import { authState } from "../store/auth";

export const Route = createRootRoute({
	component: () => {
		const accessTokenCookie = cookie.get("access_token");
		const setAuth = useSetAtom(authState);

		if (!accessTokenCookie) {
			return <LoginModal />;
		}

		const jwt = jwtDecode<{ sub: string; username: string }>(accessTokenCookie);
		setAuth({
			accessToken: accessTokenCookie,
			user: {
				username: jwt.username,
				id: jwt.sub,
			},
		});

		return <HomePage />;
	},
});
