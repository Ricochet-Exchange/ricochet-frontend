import { Banner } from 'components/layout/Banner';
import { MainLayout } from 'containers/MainLayout';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { wrapper } from 'store';
import 'styles/main.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Banner />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </CookiesProvider>
  );
}

export default wrapper.withRedux(App);
