import '../index.css';

export const metadata = {
  title: {
    default: 'Siham Hadi',
    template: '%s | Siham Hadi',
  },
  description: 'Software Developer & Designer specializing in frontend development, UI/UX design, and full-stack applications. Portfolio showcase.',
  keywords: [
    'Siham Hadi',
    'Software Developer',
    'Frontend Developer',
    'Web Developer',
    'UI/UX Designer',
    'JavaScript',
    'React',
    'Next.js',
    'Portfolio',
    'Web Design',
    'Full Stack Developer',
  ],
  authors: [{ name: 'Siham Hadi', url: 'https://sihamhadi.com' }],
  creator: 'Siham Hadi',
  publisher: 'Siham Hadi',
  metadataBase: new URL('https://sihamhadi.com'),
  alternates: {
    canonical: 'https://sihamhadi.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://sihamhadi.com',
    title: 'Siham Hadi - Software Developer & Designer',
    description: 'Software Developer & Designer specializing in frontend development, UI/UX design, and full-stack applications. Portfolio showcase.',
    siteName: 'Siham Hadi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siham Hadi - Software Developer & Designer',
    description: 'Software Developer & Designer specializing in frontend development, UI/UX design, and full-stack applications. Portfolio showcase.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://sihamhadi.com/#person',
        name: 'Siham Hadi',
        url: 'https://sihamhadi.com',
        jobTitle: 'Software Developer & Designer',
        description:
          'Software Developer and Designer specializing in frontend development, UI/UX design, and full-stack applications.',
        sameAs: [
          'https://github.com/csobr',
          'https://www.linkedin.com/in/sihamhadi/',
          'https://www.instagram.com/texturlab/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sihamhadi.com/#website',
        url: 'https://sihamhadi.com',
        name: 'Siham Hadi Portfolio',
        description:
          'Software Developer and Designer portfolio showcasing web applications, UI/UX design, and creative projects.',
        publisher: {
          '@id': 'https://sihamhadi.com/#person',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/logo/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
