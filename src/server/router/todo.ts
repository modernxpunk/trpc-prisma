import { Todo } from "@prisma/client";
import { publicProcedure, router } from "../trpc";
import prisma from "../prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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
	create: publicProcedure.input(z.string()).mutation(async (req) => {
		const name = req.input;
		if (name.length < 10) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Todo name must be at least 10 characters",
			});
		}
		const todo: Todo = await prisma.todo.create({
			data: {
				name: name,
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
