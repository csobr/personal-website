export default function sitemap() {
  const currentDate = new Date();

  return [
    {
      url: 'https://sihamhadi.com',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://sihamhadi.com/#about',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sihamhadi.com/#work',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}