import Head from 'next/head';
import '../index.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Siham Hadi</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Siham Hadi | A Software Developer And Designer."
        />
        <meta name="keywords" content="JavaScript,Frontend,developer" />
        <meta name="author" content="Siham Hadi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
