const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const publicPath = path.join(__dirname, '..', 'public', 'icons');
const outputPath = path.join(__dirname, '..', 'src', 'lib', 'icons.js');
const contentPath = path.join(__dirname, '..', 'content', 'icons');

// Import brand name corrections from SEO content generator
const { brandNameCorrections } = require('./brand-name-corrections');

function toSlug(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

function toTitle(str) {
  // Check if we have a specific correction for this brand
  if (brandNameCorrections && brandNameCorrections[str.toLowerCase()]) {
    return brandNameCorrections[str.toLowerCase()];
  }

  // Default formatting
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function getIconMetadata(brand) {
  const mdxPath = path.join(contentPath, `${brand}.mdx`);

  if (fs.existsSync(mdxPath)) {
    try {
      const fileContent = fs.readFileSync(mdxPath, 'utf8');
      const { data } = matter(fileContent);
      return {
        title: data.title || toTitle(brand),
        url: data.url || '',
        description: data.description || '',
        customKeywords: data.keywords || [],
      };
    } catch (error) {
      console.warn(`Error reading metadata for ${brand}:`, error.message);
    }
  }

  return {
    title: toTitle(brand),
    url: '',
    description: '',
    customKeywords: [],
  };
}

function generateIconList() {
  const categories = fs.readdirSync(publicPath);
  const icons = [];

  categories.forEach((category) => {
    const categoryPath = path.join(publicPath, category);
    if (!fs.statSync(categoryPath).isDirectory()) return;

    const brands = fs.readdirSync(categoryPath);

    brands.forEach((brand) => {
      const brandPath = path.join(categoryPath, brand);
      if (!fs.statSync(brandPath).isDirectory()) return;

      const files = fs.readdirSync(brandPath).filter((f) => f.endsWith('.svg'));
      const metadata = getIconMetadata(brand);

      files.forEach((fileName) => {
        icons.push({
          name: metadata.title,
          slug: toSlug(brand),
          category: toSlug(category),
          brand: metadata.title, // Use the corrected brand name instead of slug
          fileName,
          url: metadata.url,
          description: metadata.description,
          keywords: [
            toSlug(brand),
            toSlug(category),
            ...metadata.customKeywords,
          ],
        });
      });
    });
  });

  return icons;
}

function writeToFile(icons) {
  const fileContent =
    `// AUTO-GENERATED FILE. DO NOT EDIT.\n\n` +
    `export const icons = ${JSON.stringify(icons, null, 2)};\n`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`✅ icons.js generated with ${icons.length} icons`);
}

const iconList = generateIconList();
writeToFile(iconList);
