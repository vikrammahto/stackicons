const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentPath = path.join(__dirname, '..', 'content', 'icons');

function updateIconMetadata(brand, updates) {
  const mdxPath = path.join(contentPath, `${brand}.mdx`);

  if (!fs.existsSync(mdxPath)) {
    console.error(`❌ MDX file not found for ${brand}`);
    return false;
  }

  try {
    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContent);

    // Update the frontmatter with new values
    const updatedData = { ...data, ...updates };

    // Recreate the MDX file with updated frontmatter
    const updatedContent = matter.stringify(content, updatedData);

    fs.writeFileSync(mdxPath, updatedContent);
    console.log(`✅ Updated ${brand}.mdx`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${brand}:`, error.message);
    return false;
  }
}

function bulkUpdateIcons(iconUpdates) {
  let updated = 0;
  let failed = 0;

  for (const [brand, updates] of Object.entries(iconUpdates)) {
    if (updateIconMetadata(brand, updates)) {
      updated++;
    } else {
      failed++;
    }
  }

  console.log(`\n📊 Bulk Update Summary:`);
  console.log(`   Updated: ${updated} icons`);
  console.log(`   Failed: ${failed} icons`);
}

// Example usage - you can modify this object to update multiple icons at once
const exampleUpdates = {
  github: {
    title: 'GitHub',
    url: 'https://github.com',
    description:
      'GitHub is a platform for version control and collaboration that lets you and others work together on projects from anywhere.',
  },
  vscode: {
    title: 'Visual Studio Code',
    url: 'https://code.visualstudio.com',
    description:
      'Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux.',
  },
  // Add more icon updates here...
};

// Uncomment the line below to run bulk updates
// bulkUpdateIcons(exampleUpdates);

module.exports = { updateIconMetadata, bulkUpdateIcons };
