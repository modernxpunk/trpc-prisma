import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const createRandomTodo = () => {
	return {
		name: faker.lorem.words(),
	};
};

type Config = {
	todos: number;
};

const generate = ({ todos }: Config) => {
	return Array(todos).fill(0).map(createRandomTodo);
};

async function main() {
	await prisma.todo.createMany({
		data: generate({
			todos: 100,
		}),
		skipDuplicates: true,
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
