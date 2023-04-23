import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export async function createContext(opts: CreateNextContextOptions) {
	console.log(opts.req.url);
	return {
		opts,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
