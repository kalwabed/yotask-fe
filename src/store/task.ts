import { atomWithReset } from "jotai/utils";
import { Task } from "../types/task";

export const currentTaskState = atomWithReset<Task>({
	_id: "",
	title: "",
	desc: "",
	priority: false,
	status: "pending",
	createdAt: "",
});
