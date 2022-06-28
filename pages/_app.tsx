import '@styles/globals.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import type { AppProps } from 'next/app';
import Layout from '@components/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
function MyApp({ Component, pageProps }: AppProps) {

  var queryClient = new QueryClient()
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>

      <ReactQueryDevtools initialIsOpen={true} />
      <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  );
}
export default MyApp;
