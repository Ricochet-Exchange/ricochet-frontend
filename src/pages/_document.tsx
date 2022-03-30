import { Meta } from 'components/common/Meta';
import { Html, Head, Main, NextScript } from 'next/document';

export default function CustomDocument() {
  return (
    <Html lang="en">
      <Head>
        <Meta />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
