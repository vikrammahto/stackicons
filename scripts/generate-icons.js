const fs = require('fs');
const path = require('path');

const publicPath = path.join(__dirname, '..', 'public', 'icons');
const outputPath = path.join(__dirname, '..', 'src', 'lib', 'icons.js');

function toSlug(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

function toTitle(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
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

      files.forEach((fileName) => {
        icons.push({
          name: toTitle(brand),
          slug: toSlug(brand),
          category: toSlug(category),
          brand: toSlug(brand),
          fileName,
          keywords: [toSlug(brand), toSlug(category)],
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
