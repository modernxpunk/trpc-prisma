import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
	await prisma.todo.createMany({
		data: Array(100)
			.fill(0)
			.map(() => {
				return {
					name: faker.lorem.words(),
				};
			}),
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
