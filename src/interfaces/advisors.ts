export interface Advisor {
	id: number;
	name: string;
	language: string;
	status: string;
	reviews: number;
}

export type Order = "asc" | "desc";
