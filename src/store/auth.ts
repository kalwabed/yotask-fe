import { atom } from "jotai";

export const authState = atom({
	accessToken: "",
	user: {
		username: "",
		id: "",
	},
});

export const loginState = atom<"login" | "signup">("login");
