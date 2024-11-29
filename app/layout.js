import Head from 'next/head';
import '../index.css';

export const metadata = {
  title: 'Siham Hadi',
  description: 'A Software Developer And Designer.',
  keywords:
    'Siham Hadi, JavaScript, Frontend, developer, Designer, Software Developer',
  author: 'Siham Hadi',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <meta charSet="utf-8" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="viewport" content={metadata.viewport} />
        <script
          defer
          data-domain="sihamhadi.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <body>{children}</body>
    </html>
  );
}
