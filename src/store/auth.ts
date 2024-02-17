import { atom } from "jotai";

export const authState = atom({
	accessToken: "",
	user: {
		username: "",
		id: "",
	},
});
