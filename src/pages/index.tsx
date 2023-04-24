import { useState } from "react";
import Layout from "src/components/common/Layout";
import { NextPageWithLayout } from "src/types/common";
import { Todo } from "@prisma/client";
import { trpc } from "src/utils/trpc";
import { GetStaticPropsContext } from "next";
import appRouter from "src/server/router/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";
import TodoItem from "src/components/TodoItem";
import { Button } from "@ui/Button";

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
			<form
				className="flex items-stretch justify-center flex-1 max-w-sm mx-auto mt-4"
				onSubmit={() => createTodo.mutate(todoName)}
			>
				<input
					className="flex-1 border rounded rounded-r-none outline-0"
					value={todoName}
					onChange={(e) => setTodoName(e.target.value)}
				/>
				<Button className="rounded-l-none" type="submit">
					add
				</Button>
			</form>
			{createTodo.error && (
				<p className="text-center">
					<code>{JSON.stringify(createTodo.error.data?.code)}</code>
				</p>
			)}
			<div className="flex flex-col items-center justify-center flex-1 max-w-sm gap-2 mx-auto mt-8">
				{todos.data &&
					todos.data.map((todo: Todo) => (
						<TodoItem todo={todo} key={todo.id} />
					))}
			</div>
		</div>
	);
};

Home.getLayout = (page) => {
	return <Layout>{page}</Layout>;
};

export default Home;
