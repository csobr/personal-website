export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: 'https://sihamhadi.com/sitemap.xml',
    host: 'https://sihamhadi.com',
  };
}
