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
	updatedAt: "",
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
	mutationFn: async (task: Partial<Task>) => {
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

export const createTaskAtom = atomWithMutation((get) => ({
	mutationKey: ["tasks", "new"],
	mutationFn: async (task: Partial<Task>) => {
		const res = await fetch
			.post("tasks", {
				json: task,
				headers: {
					authorization: `Bearer ${get(authState).accessToken}`,
				},
			})
			.json();

		return res;
	},
}));

export const removeTaskAtom = atomWithMutation((get) => ({
	mutationKey: ["tasks", "remove"],
	mutationFn: async (id: string) => {
		const res = await fetch
			.delete(`tasks/${id}`, {
				headers: {
					authorization: `Bearer ${get(authState).accessToken}`,
				},
			})
			.json();

		return res;
	},
}));
