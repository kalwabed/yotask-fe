export interface Task {
	_id: string;
	title: string;
	desc: string;
	priority: boolean;
	status: "pending" | "completed";
	createdAt: string;
}
