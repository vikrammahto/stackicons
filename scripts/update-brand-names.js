const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { brandNameCorrections } = require('./brand-name-corrections');

const contentDir = path.join(process.cwd(), 'content/icons');

function updateBrandNames() {
  console.log('🔄 Updating brand names in existing MDX files...');

  let updated = 0;
  let failed = 0;

  const files = fs.readdirSync(contentDir);

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;

    const filePath = path.join(contentDir, file);
    const brand = path.basename(file, '.mdx');

    // Get the corrected brand name
    const correctedName = brandNameCorrections[brand] || brand;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: mdxContent } = matter(content);

      // Check if update is needed
      if (data.title === correctedName && data.brand === correctedName) {
        continue; // Already correct
      }

      // Update frontmatter
      data.title = correctedName;
      data.brand = correctedName;

      // Update the H1 heading in content
      const updatedContent = mdxContent.replace(
        /^# .+$/m,
        `# ${correctedName}`,
      );

      // Write back the file
      const newFileContent = matter.stringify(updatedContent, data);
      fs.writeFileSync(filePath, newFileContent);

      console.log(`✅ Updated ${brand} → ${correctedName}`);
      updated++;
    } catch (error) {
      console.error(`❌ Failed to update ${brand}:`, error.message);
      failed++;
    }
  }

  console.log(`\n🎉 Brand Name Update Complete!`);
  console.log(`   ✅ Updated: ${updated} files`);
  console.log(`   ❌ Failed: ${failed} files`);
}

updateBrandNames();
