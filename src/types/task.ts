export interface Task {
	_id: string;
	title: string;
	desc: string;
	priority: boolean;
	status: Status;
	createdAt: string;
	updatedAt: string;
}

export type Status = "pending" | "progress" | "completed";
