import { useState } from "react";
import Layout from "src/components/common/Layout";
import { NextPageWithLayout } from "src/types/common";
import { Todo } from "@prisma/client";
import { trpc } from "src/utils/trpc";
import { GetStaticPropsContext } from "next";
import appRouter from "src/server/router/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";

export async function getStaticProps(context: GetStaticPropsContext) {
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: {},
	});

	await ssg.todo.getAll.prefetch();

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
	};
}

const Home: NextPageWithLayout = () => {
	const todos = trpc.todo.getAll.useQuery();
	const todo1 = trpc.todo.getById.useQuery(1);
	const todo2 = trpc.todo.getById.useQuery(2);
	const createTodo = trpc.todo.create.useMutation();
	const deleteTodoById = trpc.todo.deleteById.useMutation();

	const [todoName, setTodoName] = useState<string>("");

	return (
		<div className="container">
			<input
				className="border"
				value={todoName}
				onChange={(e) => setTodoName(e.target.value)}
			/>
			<button onClick={() => createTodo.mutate(todoName)}>add</button>
			{todos.data &&
				todos.data.map((todo: Todo) => (
					<p key={todo.id} onClick={() => deleteTodoById.mutate(todo.id)}>
						{todo.name}
					</p>
				))}
		</div>
	);
};

Home.getLayout = (page) => {
	return <Layout>{page}</Layout>;
};

export default Home;
