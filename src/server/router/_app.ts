import { router } from "../trpc";
import todoRouter from "./todo";

const appRouter = router({
	todo: todoRouter,
});

export default appRouter;

export type AppRouter = typeof appRouter;
