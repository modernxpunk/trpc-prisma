import { AppPropsWithLayout } from "src/types/common";
import "../styles/global.css";
import { trpc } from "src/utils/trpc";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return getLayout(<Component {...pageProps} />);
}

export default trpc.withTRPC(MyApp);
