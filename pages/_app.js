import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import customTheme from '../styles/theme';
import GlobalProvider from '../contexts/GlobalProvider';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<ChakraProvider resetCSS theme={customTheme}>
			<QueryClientProvider client={queryClient}>
				<GlobalProvider>
					<Component {...pageProps} />
				</GlobalProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
export default MyApp;
