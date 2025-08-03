const { bulkUpdateIcons } = require('./update-icon-metadata.js');

// Example bulk updates for popular tech icons
// Uncomment and modify as needed

const popularTechUpdates = {
  javascript: {
    title: 'JavaScript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    description:
      'JavaScript is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
  typescript: {
    title: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    description:
      'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
  },
  nodejs: {
    title: 'Node.js',
    url: 'https://nodejs.org',
    description:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.",
  },
  python: {
    title: 'Python',
    url: 'https://www.python.org',
    description:
      'Python is a high-level, general-purpose programming language that emphasizes code readability with its notable use of significant indentation.',
  },
  docker: {
    title: 'Docker',
    url: 'https://www.docker.com',
    description:
      'Docker is a platform designed to help developers build, share, and run container applications anywhere.',
  },
};

const socialMediaUpdates = {
  youtube: {
    title: 'YouTube',
    url: 'https://www.youtube.com',
    description:
      'YouTube is a video sharing platform where users can upload, view, and share videos worldwide.',
  },
  instagram: {
    title: 'Instagram',
    url: 'https://www.instagram.com',
    description:
      'Instagram is a photo and video sharing social networking service owned by Meta Platforms.',
  },
  twitter: {
    title: 'Twitter',
    url: 'https://twitter.com',
    description:
      'Twitter is a microblogging and social networking service where users post and interact with messages known as tweets.',
  },
};

// To run updates, uncomment one of the following lines:
// bulkUpdateIcons(popularTechUpdates);
// bulkUpdateIcons(socialMediaUpdates);

console.log('Example bulk update script ready!');
console.log(
  'Uncomment the desired update section and run: npm run update:metadata',
);
