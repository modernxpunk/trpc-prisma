export type Post = {
	id: number;
	title: string;
	content?: string;
	published?: boolean;
	authorId: number;
};

export type User = {
	id: number;
	email: string;
	name?: string;
	posts: Post[];
};
