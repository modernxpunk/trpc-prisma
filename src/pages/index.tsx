import { useState } from "react";
import Layout from "src/components/common/Layout";
import { NextPageWithLayout } from "src/types/common";
import { Todo } from "@prisma/client";
import { trpc } from "src/utils/trpc";
import { GetStaticPropsContext } from "next";
import appRouter from "src/server/router/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";
import TodoItem from "src/components/TodoItem";

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
	// const todo1 = trpc.todo.getById.useQuery(1);
	const createTodo = trpc.todo.create.useMutation();

	// useState<Pick<Todo, "name">>("")
	const [todoName, setTodoName] = useState<string>("");

	return (
		<div className="container">
			<form onSubmit={() => createTodo.mutate(todoName)}>
				<input
					className="border"
					value={todoName}
					onChange={(e) => setTodoName(e.target.value)}
				/>
				<button type="submit">add</button>
			</form>
			{createTodo.error && (
				<p>
					<code>{JSON.stringify(createTodo.error.data?.code)}</code>
				</p>
			)}
			{todos.data &&
				todos.data.map((todo: Todo) => <TodoItem todo={todo} key={todo.id} />)}
		</div>
	);
};

Home.getLayout = (page) => {
	return <Layout>{page}</Layout>;
};

export default Home;
