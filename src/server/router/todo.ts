import { Todo } from "@prisma/client";
import { procedure, router } from "../trpc";
import prisma from "../prisma";
import { z } from "zod";

const todoRouter = router({
	getAll: procedure.query(async () => {
		const todos: Todo[] = await prisma.todo.findMany();
		return todos;
	}),
	getById: procedure.input(z.number()).query(async (req) => {
		const id = req.input;
		const todo: Todo | null = await prisma.todo.findUnique({
			where: { id },
		});
		return todo;
	}),
	create: procedure.input(z.string()).mutation(async (req) => {
		const name = req.input;
		const todo: Todo = await prisma.todo.create({
			data: {
				name: name,
			},
		});
		return todo;
	}),
	deleteById: procedure.input(z.number()).mutation(async (req) => {
		const id = req.input;
		const todo: Todo = await prisma.todo.delete({
			where: {
				id: id,
			},
		});
		return todo;
	}),
});

export default todoRouter;
