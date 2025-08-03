import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Use dynamic path resolution that works in both dev and build environments
function getContentPath() {
  if (typeof window === 'undefined') {
    // Server-side
    return path.join(process.cwd(), 'content', 'icons');
  }
  return null; // Client-side shouldn't call this directly
}

export function getMDXContent(slug) {
  try {
    const contentPath = getContentPath();
    if (!contentPath) {
      throw new Error('MDX content can only be read on the server side');
    }

    const mdxPath = path.join(contentPath, `${slug}.mdx`);

    if (!fs.existsSync(mdxPath)) {
      return null;
    }

    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data,
      content: content,
    };
  } catch (error) {
    console.error(`Error reading MDX file for ${slug}:`, error);
    return null;
  }
}

export function getAllMDXSlugs() {
  try {
    const contentPath = getContentPath();
    if (!contentPath) {
      throw new Error('MDX content can only be read on the server side');
    }

    if (!fs.existsSync(contentPath)) {
      return [];
    }

    const files = fs.readdirSync(contentPath);
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace('.mdx', ''));
  } catch (error) {
    console.error('Error reading MDX directory:', error);
    return [];
  }
}
