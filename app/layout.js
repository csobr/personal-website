import '../index.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: {
    default: 'Siham Hadi',
    template: '%s | Siham Hadi',
  },
  description:
    'Siham Hadi is a Software Developer and Designer specializing in frontend development, UI/UX design, and full-stack web applications. Explore selected creative projects and design work.',
  keywords: [
    'Siham Hadi',
    'Siham Hadi Developer',
    'Siham Hadi Designer',
    'Founder',
    'Software Developer',
    'Frontend Developer',
    'Web Developer',
    'UI/UX Designer',
    'JavaScript Developer',
    'React Developer',
    'Next.js Developer',
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
    type: 'profile',
    url: 'https://sihamhadi.com',
    title: 'Siham Hadi',
    description:
      'Siham Hadi is a Software Developer and Designer specializing in frontend development, UI/UX design, and full-stack web applications. Explore selected creative projects and design work.',
    siteName: 'Siham Hadi',
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Siham Hadi',
      },
    ],
    profile: {
      firstName: 'Siham',
      lastName: 'Hadi',
      username: 'sihamhadi',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siham Hadi',
    description:
      'Siham Hadi is a Software Developer and Designer specializing in frontend development, UI/UX design, and full-stack web applications.',
    creator: '@sihamhadi',
    images: ['/og.png'],
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
        givenName: 'Siham',
        familyName: 'Hadi',
        url: 'https://sihamhadi.com',
        image: 'https://sihamhadi.com/logo/apple-touch-icon.png',
        jobTitle: [
          'Software Developer',
          'UI/UX Designer',
          'Frontend Developer',
        ],
        description:
          'Siham Hadi is a Software Developer and Designer specializing in frontend development, UI/UX design, and full-stack applications. Experienced in JavaScript, React, and Next.js.',
        knowsAbout: [
          'JavaScript',
          'React',
          'Next.js',
          'Frontend Development',
          'UI/UX Design',
          'Web Development',
          'Full Stack Development',
          'Web Design',
        ],
        sameAs: [
          'https://github.com/csobr',
          'https://www.linkedin.com/in/sihamhadi/',
        ],

        nationality: 'SE',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sihamhadi.com/#website',
        url: 'https://sihamhadi.com',
        name: 'Siham Hadi - Software Developer & Designer',
        alternateName: 'Siham Hadi',
        description:
          'Official website of Siham Hadi, Software Developer and Designer showcasing web applications, UI/UX design projects, and creative work.',
        inLanguage: 'en-US',
        author: {
          '@id': 'https://sihamhadi.com/#person',
        },
        publisher: {
          '@id': 'https://sihamhadi.com/#person',
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://sihamhadi.com/#profilepage',
        url: 'https://sihamhadi.com',
        name: 'Siham Hadi - Software Developer & Designer',
        description:
          'Professional portfolio of Siham Hadi showcasing software development and design work.',
        mainEntity: {
          '@id': 'https://sihamhadi.com/#person',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://sihamhadi.com/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://sihamhadi.com',
          },
        ],
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
        <link rel="author" href="/humans.txt" />
        <meta name="author" content="Siham Hadi" />
        <meta name="designer" content="Siham Hadi" />
        <meta name="developer" content="Siham Hadi" />
        <meta property="profile:first_name" content="Siham" />
        <meta property="profile:last_name" content="Hadi" />
        <meta property="profile:username" content="sihamhadi" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
