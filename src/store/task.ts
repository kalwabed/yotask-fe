import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";
import { atomWithReset } from "jotai/utils";
import ky from "ky";
import { authState } from "../store/auth";
import { Task } from "../types/task";

const SERVER_URL = "http://localhost:8000";

const fetch = ky.extend({ prefixUrl: SERVER_URL });

export const currentTaskState = atomWithReset<Task>({
	_id: "",
	title: "",
	desc: "",
	priority: false,
	status: "pending",
	createdAt: "",
});

export const getTasksAtom = atomWithQuery((get) => ({
	queryKey: ["tasks", "user", get(authState).user.id],
	queryFn: async ({ queryKey: [, , id] }) => {
		const tasks: Task[] = await fetch
			.get(`tasks/user/${id}`, {
				headers: {
					authorization: `Bearer ${get(authState).accessToken}`,
				},
			})
			.json();
		return tasks;
	},
}));

export const updateTaskAtom = atomWithMutation((get) => ({
	mutationKey: ["tasks", get(currentTaskState)._id],
	mutationFn: async (task: Omit<Task, "createdAt">) => {
		const res = await fetch
			.patch(`tasks/${task._id}`, {
				json: task,
				headers: {
					authorization: `Bearer ${get(authState).accessToken}`,
				},
			})
			.json();

		return res;
	},
}));
