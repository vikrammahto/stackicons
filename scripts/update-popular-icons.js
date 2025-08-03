const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '..', 'content', 'icons');

const popularIconsData = {
  javascript: {
    title: 'JavaScript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    description:
      'JavaScript is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. It enables interactive web pages and is an essential part of web applications.',
    content: `JavaScript is a high-level, dynamic programming language that conforms to the ECMAScript specification. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.

Originally developed by Brendan Eich at Netscape in 1995, JavaScript has evolved to become one of the most popular programming languages in the world. It runs on virtually every platform and is supported by all modern web browsers without the need for plug-ins.

## Key Features

- **Dynamic Typing**: Variables don't need explicit type declarations
- **First-class Functions**: Functions can be assigned to variables, passed as arguments
- **Prototype-based OOP**: Objects can inherit directly from other objects
- **Event-driven Programming**: Responds to user interactions and system events`,
  },

  typescript: {
    title: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    description:
      'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds static typing to JavaScript to help catch errors early.',
    content: `TypeScript is a syntactic superset of JavaScript which adds static type definitions. Types provide a way to describe the shape of an object, providing better documentation, and allowing TypeScript to validate that your code is working correctly.

Developed by Microsoft and first released in 2012, TypeScript has become increasingly popular in enterprise applications and large-scale JavaScript projects.

## Key Benefits

- **Static Type Checking**: Catch errors at compile time rather than runtime
- **Enhanced IDE Support**: Better autocomplete, refactoring, and navigation
- **Modern JavaScript Features**: Support for latest ECMAScript features
- **Gradual Adoption**: Can be adopted incrementally in existing JavaScript projects`,
  },

  python: {
    title: 'Python',
    url: 'https://www.python.org',
    description:
      'Python is a high-level, general-purpose programming language that emphasizes code readability with its notable use of significant indentation and simple, easy-to-learn syntax.',
    content: `Python is an interpreted, object-oriented, high-level programming language with dynamic semantics. Its high-level built in data structures, combined with dynamic typing and dynamic binding, make it very attractive for Rapid Application Development.

Created by Guido van Rossum and first released in 1991, Python's design philosophy emphasizes code readability and a syntax that allows programmers to express concepts in fewer lines of code.

## Popular Use Cases

- **Web Development**: Django, Flask, FastAPI
- **Data Science**: NumPy, Pandas, Matplotlib
- **Machine Learning**: TensorFlow, PyTorch, scikit-learn
- **Automation**: Scripting, testing, system administration`,
  },

  docker: {
    title: 'Docker',
    url: 'https://www.docker.com',
    description:
      'Docker is a platform designed to help developers build, share, and run container applications anywhere. It uses containerization to package applications with their dependencies.',
    content: `Docker is a set of platform-as-a-service (PaaS) products that use OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files.

Docker was first released in 2013 and has revolutionized how applications are deployed and managed, enabling consistent environments from development to production.

## Key Concepts

- **Containers**: Lightweight, portable, and self-sufficient runtime environments
- **Images**: Read-only templates used to create containers
- **Dockerfile**: Script containing instructions to build Docker images
- **Docker Hub**: Cloud-based registry for sharing container images`,
  },
};

function updatePopularIcons() {
  let updated = 0;
  let failed = 0;

  for (const [brand, data] of Object.entries(popularIconsData)) {
    try {
      const mdxPath = path.join(contentPath, `${brand}.mdx`);

      if (fs.existsSync(mdxPath)) {
        const frontmatter = {
          title: data.title,
          url: data.url,
          description: data.description,
          category: 'technology',
          brand: brand,
          keywords: [brand, 'programming', 'development', 'technology'],
        };

        const yamlFrontmatter = Object.entries(frontmatter)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}: [${value.map((v) => `"${v}"`).join(', ')}]`;
            }
            return `${key}: "${value}"`;
          })
          .join('\n');

        const mdxContent = `---
${yamlFrontmatter}
---

# ${data.title}

${data.content}`;

        fs.writeFileSync(mdxPath, mdxContent);
        console.log(`✅ Updated ${brand}.mdx`);
        updated++;
      } else {
        console.log(`⚠️  ${brand}.mdx does not exist`);
        failed++;
      }
    } catch (error) {
      console.error(`❌ Error updating ${brand}:`, error.message);
      failed++;
    }
  }

  console.log(`\n📊 Popular Icons Update Summary:`);
  console.log(`   Updated: ${updated} icons`);
  console.log(`   Failed/Missing: ${failed} icons`);
}

if (require.main === module) {
  updatePopularIcons();
}

module.exports = { updatePopularIcons, popularIconsData };
