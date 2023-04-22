import { Button } from "@ui/Button";
import { Modal } from "@ui/Modal";
import { useState } from "react";
import Layout from "src/components/common/Layout";
import { NextPageWithLayout } from "src/types/common";
import { PrismaClient } from "@prisma/client";
import { User } from "src/types/models";

export async function getStaticProps() {
	const prisma = new PrismaClient();
	const users = await prisma.user.findMany();
	return {
		props: { users },
	};
}

const Home: NextPageWithLayout = ({ users }: any) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [email, setEmail] = useState<string>("");
	const handleAdd = async () => {
		try {
			await fetch("/api/user", {
				body: JSON.stringify({
					email,
				}),
				method: "POST",
			});
			setEmail("");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="container">
			<Button onClick={() => setIsOpen(true)}>open modal</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				Hello world
			</Modal>
			<h3 className="text-2xl font-title font-bold">Hello world</h3>
			<input value={email} onChange={(e) => setEmail(e.target.value)} />
			<button onClick={handleAdd}>add</button>
			{users.map((user: User) => {
				return <div key={user.id}>{user.email}</div>;
			})}
		</div>
	);
};

Home.getLayout = (page) => {
	return <Layout>{page}</Layout>;
};

export default Home;
