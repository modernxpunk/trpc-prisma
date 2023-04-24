import { cx } from "class-variance-authority";
import { ReactNode } from "react";
import { fontsVariables } from "src/utils/config";

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<div
			className={cx(
				"flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500",
				fontsVariables.map((fontVariable: string) => fontVariable),
				"font-sans"
			)}
		>
			<header>
				<nav></nav>
			</header>
			<main className="flex-1">{children}</main>
			<footer></footer>
		</div>
	);
};

export default Layout;
