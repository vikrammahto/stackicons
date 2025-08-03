import { icons } from '@/lib/icons';

export default function sitemap() {
  const baseUrl = 'https://stackicons.com'; // Replace with your actual domain

  // Get unique slugs
  const uniqueSlugs = [
    ...new Set(icons.map((icon) => icon.name.toLowerCase().split('-')[0])),
  ];

  const iconPages = uniqueSlugs.map((slug) => ({
    url: `${baseUrl}/icon/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/icon`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...iconPages,
  ];
}
