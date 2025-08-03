'use client';
import React from 'react';

const StructuredData = ({ icon, mdxContent }) => {
  if (!icon || !mdxContent) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: mdxContent.frontmatter?.title || icon.name,
    description:
      mdxContent.frontmatter?.description || `${icon.name} icon in SVG format`,
    url: mdxContent.frontmatter?.url || '',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    creator: {
      '@type': 'Organization',
      name: 'StackIcons',
    },
    image: `/icons/${icon.category}/${icon.brand}/${icon.fileName}`,
    downloadUrl: `/icons/${icon.category}/${icon.brand}/${icon.fileName}`,
    keywords:
      mdxContent.frontmatter?.keywords?.join(', ') || icon.keywords?.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;
