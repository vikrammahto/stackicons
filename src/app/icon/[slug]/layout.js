import { getMDXContent } from '@/lib/mdx';
import { icons } from '@/lib/icons';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Find the icon
  const iconVariants = icons.filter(
    (icon) => icon.name.toLowerCase().split('-')[0] === slug.toLowerCase(),
  );

  const mdxContent = getMDXContent(slug);
  const icon = iconVariants[0];

  if (!icon) {
    return {
      title: 'Icon Not Found',
      description: 'The requested icon could not be found.',
    };
  }

  const title = mdxContent?.frontmatter?.title || icon.name;
  const description =
    mdxContent?.frontmatter?.description ||
    `Download ${title} icon in SVG format. High-quality, scalable vector icon for web design, apps, and presentations.`;

  return {
    title: `${title} Icon - Download SVG Logo | StackIcons`,
    description: description,
    keywords:
      mdxContent?.frontmatter?.keywords?.join(', ') ||
      `${slug}, icon, svg, logo, vector, download`,
    openGraph: {
      title: `${title} Icon - StackIcons`,
      description: description,
      type: 'website',
      images: [
        {
          url: `/icons/${icon.category}/${icon.brand}/${icon.fileName}`,
          width: 512,
          height: 512,
          alt: `${title} Icon`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${title} Icon - StackIcons`,
      description: description,
      images: [`/icons/${icon.category}/${icon.brand}/${icon.fileName}`],
    },
    alternates: {
      canonical: `/icon/${slug}`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
