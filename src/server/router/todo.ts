import { Todo } from "@prisma/client";
import { publicProcedure, router } from "../trpc";
import prisma from "../prisma";
import { z } from "zod";

const todoRouter = router({
	getAll: publicProcedure.query(async () => {
		const todos: Todo[] = await prisma.todo.findMany();
		return todos;
	}),
	getById: publicProcedure.input(z.number()).query(async (req) => {
		const id = req.input;
		const todo: Todo | null = await prisma.todo.findUnique({
			where: { id },
		});
		return todo;
	}),
	create: publicProcedure
		.input(z.string().min(10).max(100))
		.mutation(async (req) => {
			const name = req.input;
			const todo: Todo = await prisma.todo.create({
				data: {
					name: name,
				},
			});
			return todo;
		}),
	editById: publicProcedure
		.input(
			z.object({
				id: z.number(),
				name: z.string().min(10).max(100),
			})
		)
		.mutation(async (req) => {
			const { id, name } = req.input;
			const todo: Todo = await prisma.todo.update({
				where: {
					id: id,
				},
				data: {
					name,
				},
			});
			return todo;
		}),
	deleteById: publicProcedure.input(z.number()).mutation(async (req) => {
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
