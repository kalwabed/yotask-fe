import { createRootRoute } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import cookie from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import { authState } from "../store/auth";
import LoginModal from "../components/login-modal";

export const Route = createRootRoute({
	component: () => {
		const setAuth = useSetAtom(authState);
		const accessTokenCookie = cookie.get('access_token')

		if (!accessTokenCookie) {
			return <LoginModal />
		}

		const jwt = jwtDecode<{ sub: string; username: string }>(accessTokenCookie)
		setAuth({
			accessToken: accessTokenCookie,
			user: {
				username: jwt.username,
				id: jwt.sub
			}
		})

		return <>hello</>;
	},
});
