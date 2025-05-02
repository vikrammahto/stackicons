const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const iconsPath = path.join(__dirname, '../public/icons');

async function formatSvgFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await formatSvgFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.svg')) {
      const svgContent = fs.readFileSync(fullPath, 'utf-8');
      try {
        const formattedSvg = await prettier.format(svgContent, {
          parser: 'html',
          plugins: [require('prettier/parser-html')],
        });
        fs.writeFileSync(fullPath, formattedSvg, 'utf-8');
        console.log(`Formatted: ${fullPath}`);
      } catch (error) {
        console.error(`Failed to format: ${fullPath}`, error);
      }
    }
  }
}

(async () => {
  await formatSvgFiles(iconsPath);
})();
