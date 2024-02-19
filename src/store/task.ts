import { atomWithQuery } from "jotai-tanstack-query";
import { atomWithReset } from "jotai/utils";
import ky from "ky";
import { authState } from "../store/auth";
import { Task } from "../types/task";

export const currentTaskState = atomWithReset<Task>({
	_id: "",
	title: "",
	desc: "",
	priority: false,
	status: "pending",
	createdAt: "",
});

export const getTasksAtom = atomWithQuery((get) => ({
	queryKey: ["users", get(authState).user.id],
	queryFn: async () => {
		const tasks: Task[] = await ky
			.get("http://localhost:8000/tasks", {
				headers: {
					authorization: `Bearer ${get(authState).accessToken}`,
				},
			})
			.json();
		return tasks;
	},
}));
