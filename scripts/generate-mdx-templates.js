const fs = require('fs');
const path = require('path');

const publicPath = path.join(__dirname, '..', 'public', 'icons');
const contentPath = path.join(__dirname, '..', 'content', 'icons');

function toTitle(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateMDXTemplate(brand, category) {
  return `---
title: "${toTitle(brand)}"
url: ""
description: ""
category: "${category}"
brand: "${brand}"
keywords: ["${brand}", "${category}"]
---

# ${toTitle(brand)}

Add a detailed description of ${toTitle(brand)} here.
`;
}

function generateMDXFiles() {
  if (!fs.existsSync(contentPath)) {
    fs.mkdirSync(contentPath, { recursive: true });
  }

  const categories = fs.readdirSync(publicPath);
  let created = 0;
  let existing = 0;

  categories.forEach((category) => {
    const categoryPath = path.join(publicPath, category);
    if (!fs.statSync(categoryPath).isDirectory()) return;

    const brands = fs.readdirSync(categoryPath);

    brands.forEach((brand) => {
      const brandPath = path.join(categoryPath, brand);
      if (!fs.statSync(brandPath).isDirectory()) return;

      const mdxPath = path.join(contentPath, `${brand}.mdx`);

      if (!fs.existsSync(mdxPath)) {
        const template = generateMDXTemplate(brand, category);
        fs.writeFileSync(mdxPath, template);
        created++;
        console.log(`✅ Created: ${brand}.mdx`);
      } else {
        existing++;
      }
    });
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created} MDX files`);
  console.log(`   Existing: ${existing} MDX files`);
  console.log(`   Total: ${created + existing} MDX files`);
}

if (require.main === module) {
  generateMDXFiles();
}

module.exports = { generateMDXFiles };
