import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;
	if (method === "GET") {
		const id = req.query.id;
		const user = await prisma.user.findUnique({
			where: id as any,
		});
		res.json(user);
	} else if (method === "POST") {
		const body = JSON.parse(req.body);
		const email = body.email;
		const user = await prisma.user.create({
			data: {
				email: email,
			},
		});
		res.json(user);
	} else if (method === "DELETE") {
		const id = req.query.id;
		const user = await prisma.user.delete({
			where: id as any,
		});
		res.json(user);
	}
}
