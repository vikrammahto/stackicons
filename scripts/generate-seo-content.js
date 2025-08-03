const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Import brand name corrections
const { brandNameCorrections } = require('./brand-name-corrections');

const contentPath = path.join(__dirname, '..', 'content', 'icons');

// SEO-optimized content templates by category
const categoryTemplates = {
  ai: {
    description: (name) =>
      `${name} is an advanced artificial intelligence platform that leverages machine learning and natural language processing to provide intelligent solutions. This AI technology helps automate tasks, enhance decision-making, and improve user experiences across various applications.`,
    content: (
      name,
      url,
    ) => `${name} represents cutting-edge artificial intelligence technology designed to transform how we interact with digital systems. As an AI-powered solution, it utilizes sophisticated algorithms and machine learning models to understand, process, and respond to complex queries and tasks.

## Key AI Features

- **Natural Language Processing**: Advanced understanding of human language and context
- **Machine Learning Integration**: Continuous learning and improvement capabilities  
- **Intelligent Automation**: Streamlined workflows and task automation
- **Adaptive Responses**: Context-aware and personalized interactions

## Applications and Use Cases

${name} is widely used across industries for various applications including customer service automation, content generation, data analysis, and decision support systems. Its versatility makes it valuable for both individual users and enterprise solutions.

## Technology Innovation

The underlying technology combines deep learning, neural networks, and advanced computational models to deliver reliable and efficient AI services. This makes ${name} a powerful tool for businesses looking to integrate artificial intelligence into their operations.`,
    keywords: [
      'artificial intelligence',
      'AI',
      'machine learning',
      'automation',
      'natural language processing',
    ],
  },

  technology: {
    description: (name) =>
      `${name} is a powerful technology platform that provides developers and businesses with essential tools and services for building modern applications. It offers robust features, scalability, and integration capabilities for various development needs.`,
    content: (
      name,
      url,
    ) => `${name} is a comprehensive technology solution designed to meet the evolving needs of modern software development and digital transformation. This platform combines innovative features with reliable performance to help developers and organizations build, deploy, and scale applications effectively.

## Core Technology Features

- **Developer-Friendly**: Intuitive tools and comprehensive documentation
- **Scalable Architecture**: Built to handle growth from startup to enterprise scale
- **Integration Capabilities**: Seamless connectivity with other platforms and services
- **Performance Optimization**: Engineered for speed, reliability, and efficiency

## Development Benefits

${name} streamlines the development process by providing pre-built components, APIs, and frameworks that reduce development time and complexity. This allows teams to focus on creating unique value rather than reinventing common functionality.

## Industry Applications

Organizations across various industries leverage ${name} for web development, mobile applications, cloud services, and enterprise solutions. Its versatility and robust feature set make it suitable for projects of all sizes and complexity levels.

## Community and Ecosystem

The ${name} ecosystem includes extensive community support, third-party integrations, and continuous updates that ensure developers have access to the latest tools and best practices in technology development.`,
    keywords: [
      'technology',
      'development',
      'programming',
      'software',
      'platform',
      'tools',
    ],
  },

  'social-media': {
    description: (name) =>
      `${name} is a leading social media platform that connects people worldwide through sharing, communication, and community building. It offers various features for content creation, social networking, and digital engagement.`,
    content: (
      name,
      url,
    ) => `${name} has revolutionized digital communication and social interaction by providing a platform where users can connect, share experiences, and build communities around shared interests. As a major social media network, it plays a significant role in how people communicate and consume content online.

## Social Media Features

- **Content Sharing**: Easy sharing of photos, videos, stories, and updates
- **Community Building**: Tools for creating and managing groups and communities
- **Real-time Communication**: Instant messaging and live interaction capabilities
- **Content Discovery**: Advanced algorithms for personalized content recommendations

## User Engagement

${name} facilitates meaningful connections between users through various interaction methods including likes, comments, shares, and direct messaging. The platform's engagement features help users build relationships and expand their social networks.

## Business Applications

Many businesses leverage ${name} for marketing, customer engagement, brand building, and e-commerce. The platform provides analytics, advertising tools, and business features that help organizations reach their target audiences effectively.

## Privacy and Safety

${name} implements various privacy controls and safety measures to protect users while maintaining an open and engaging social environment. These features help users control their visibility and interactions on the platform.`,
    keywords: [
      'social media',
      'social networking',
      'communication',
      'community',
      'sharing',
      'digital interaction',
    ],
  },

  'financial-services': {
    description: (name) =>
      `${name} is a trusted financial services platform that provides secure payment processing, money transfers, and financial management solutions. It offers reliable and convenient financial services for individuals and businesses worldwide.`,
    content: (
      name,
      url,
    ) => `${name} stands as a cornerstone in the digital financial services landscape, providing secure, reliable, and innovative solutions for managing money and conducting transactions. This platform has transformed how people and businesses handle their financial needs in the digital age.

## Financial Services

- **Secure Payments**: Industry-leading encryption and fraud protection
- **Money Transfers**: Fast and reliable domestic and international transfers
- **Account Management**: Comprehensive tools for financial tracking and management
- **Business Solutions**: Specialized services for merchants and enterprises

## Security and Trust

${name} employs advanced security measures including multi-factor authentication, encryption, and fraud detection to protect user funds and personal information. Regular security audits and compliance with financial regulations ensure the highest standards of safety.

## Global Reach

With operations spanning multiple countries and currencies, ${name} facilitates international commerce and personal financial management. The platform supports various payment methods and currencies to serve a diverse global user base.

## Innovation in Finance

${name} continues to innovate in the fintech space by introducing new features, improving user experience, and adapting to changing financial regulations and market needs. This commitment to innovation keeps the platform at the forefront of digital financial services.`,
    keywords: [
      'financial services',
      'payments',
      'money transfer',
      'fintech',
      'digital banking',
      'secure transactions',
    ],
  },

  'art-and-music': {
    description: (name) =>
      `${name} is a creative platform dedicated to art and music, providing tools and services for artists, musicians, and creative professionals to showcase, distribute, and monetize their work while connecting with audiences worldwide.`,
    content: (
      name,
      url,
    ) => `${name} serves as a vital hub for creativity and artistic expression, connecting artists, musicians, and creative professionals with audiences around the globe. This platform celebrates and supports the creative community by providing essential tools and services for artistic success.

## Creative Features

- **Content Showcase**: Professional portfolios and galleries for artists
- **Music Streaming**: High-quality audio streaming and playlist creation
- **Artist Tools**: Creation, editing, and production capabilities
- **Community Engagement**: Social features for artist-audience interaction

## For Artists and Musicians

${name} empowers creative professionals by providing platforms to display their work, build audiences, and generate revenue from their artistic endeavors. The platform supports various artistic mediums and musical genres.

## Discovery and Curation

Advanced recommendation systems help users discover new artists, music, and creative content based on their preferences and interests. Curated collections and featured content highlight exceptional creative work.

## Creative Economy

${name} contributes to the creative economy by providing monetization opportunities, commission systems, and marketplace features that allow artists and musicians to earn from their creative work while building sustainable careers.`,
    keywords: [
      'art',
      'music',
      'creativity',
      'artists',
      'musicians',
      'creative platform',
      'portfolio',
    ],
  },

  'food-and-beverage': {
    description: (name) =>
      `${name} is a renowned food and beverage brand that delivers quality products and exceptional dining experiences. Known for innovation in culinary offerings and commitment to customer satisfaction across global markets.`,
    content: (
      name,
      url,
    ) => `${name} has established itself as a significant player in the global food and beverage industry, consistently delivering quality products and memorable dining experiences to customers worldwide. The brand represents culinary excellence and innovation in food service.

## Culinary Excellence

- **Quality Ingredients**: Commitment to using premium, fresh ingredients
- **Menu Innovation**: Regular introduction of new flavors and options
- **Global Presence**: Serving diverse markets with localized offerings
- **Customer Experience**: Focus on exceptional service and satisfaction

## Brand Heritage

${name} has built a strong reputation through years of consistent quality, customer service, and culinary innovation. The brand's heritage reflects its commitment to food excellence and customer satisfaction.

## Sustainability Initiatives

Many food and beverage brands like ${name} are increasingly focused on sustainable practices, including responsible sourcing, waste reduction, and environmental stewardship to create a positive impact on communities and the planet.

## Market Impact

${name} plays an important role in the food and beverage industry, influencing trends, setting standards for quality, and contributing to the economic growth of the communities where it operates.`,
    keywords: [
      'food',
      'beverage',
      'restaurant',
      'dining',
      'culinary',
      'brand',
      'hospitality',
    ],
  },

  default: {
    description: (name) =>
      `${name} is a well-established brand that provides quality products and services to customers worldwide. Known for reliability, innovation, and commitment to excellence in its industry sector.`,
    content: (
      name,
      url,
    ) => `${name} represents a trusted brand with a strong commitment to quality, innovation, and customer satisfaction. The company has built its reputation through consistent delivery of excellent products and services that meet the evolving needs of its customers.

## Brand Values

- **Quality Assurance**: Commitment to delivering high-quality products and services
- **Customer Focus**: Dedication to understanding and meeting customer needs
- **Innovation**: Continuous improvement and development of new solutions
- **Reliability**: Consistent performance and dependable service delivery

## Market Position

${name} has established a strong market presence through strategic positioning, quality offerings, and customer-centric approaches. The brand continues to evolve and adapt to changing market conditions and customer preferences.

## Service Excellence

The company prioritizes service excellence by investing in customer support, quality assurance, and continuous improvement processes. This focus on service quality helps maintain strong customer relationships and brand loyalty.

## Future Vision

${name} continues to look forward, investing in innovation, sustainability, and growth opportunities that will benefit customers, stakeholders, and the broader community while maintaining its core values and commitments.`,
    keywords: [
      'brand',
      'quality',
      'innovation',
      'customer service',
      'reliability',
      'excellence',
    ],
  },
};

// Function to get appropriate template based on category
function getTemplate(category) {
  const templates = {
    ai: categoryTemplates.ai,
    technology: categoryTemplates.technology,
    tech: categoryTemplates.technology,
    'social-media': categoryTemplates['social-media'],
    'financial-services': categoryTemplates['financial-services'],
    'art-and-music': categoryTemplates['art-and-music'],
    'food-and-beverage': categoryTemplates['food-and-beverage'],
    automobile: categoryTemplates.default,
    'clothing-and-apparel': categoryTemplates.default,
    education: categoryTemplates.technology,
    pharmaceuticals: categoryTemplates.default,
    'travel-and-tourism': categoryTemplates.default,
  };

  return templates[category] || categoryTemplates.default;
}

// Function to generate SEO-optimized title
// Comprehensive brand name corrections
function generateSEOTitle(brand) {
  // Check if we have a specific correction for this brand
  if (brandNameCorrections[brand.toLowerCase()]) {
    return brandNameCorrections[brand.toLowerCase()];
  }

  // Default formatting for brands not in the corrections list
  const brandName = brand
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return brandName;
}

// Function to generate comprehensive SEO content
async function generateSEOContent() {
  const publicPath = path.join(__dirname, '..', 'public', 'icons');

  let updated = 0;
  let failed = 0;

  // Read directory structure to get all brands
  const brandMap = new Map();
  const categories = fs.readdirSync(publicPath);

  categories.forEach((category) => {
    const categoryPath = path.join(publicPath, category);
    if (!fs.statSync(categoryPath).isDirectory()) return;

    const brands = fs.readdirSync(categoryPath);
    brands.forEach((brand) => {
      const brandPath = path.join(categoryPath, brand);
      if (!fs.statSync(brandPath).isDirectory()) return;

      if (!brandMap.has(brand)) {
        brandMap.set(brand, { brand, category });
      }
    });
  });

  console.log(
    `📝 Generating SEO content for ${brandMap.size} unique brands...`,
  );

  for (const [brand, iconData] of brandMap) {
    try {
      const mdxPath = path.join(contentPath, `${brand}.mdx`);

      if (!fs.existsSync(mdxPath)) {
        console.log(`⚠️  Skipping ${brand} - MDX file not found`);
        continue;
      }

      // Read existing file
      const existingContent = fs.readFileSync(mdxPath, 'utf8');
      const { data: existingData } = matter(existingContent);

      // Skip if already has detailed description
      if (existingData.description && existingData.description.length > 100) {
        console.log(`⏭️  Skipping ${brand} - already has detailed content`);
        continue;
      }

      const template = getTemplate(iconData.category);
      const title = generateSEOTitle(brand);
      const description = template.description(title);
      const content = template.content(title, existingData.url || '');

      // Enhanced keywords
      const enhancedKeywords = [
        brand,
        iconData.category,
        ...template.keywords,
        title.toLowerCase(),
        'logo',
        'icon',
        'brand',
        'svg',
      ].filter((keyword, index, array) => array.indexOf(keyword) === index);

      const frontmatter = {
        title: title,
        url: existingData.url || '',
        description: description,
        category: iconData.category,
        brand: brand,
        keywords: enhancedKeywords,
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

# ${title}

${content}`;

      fs.writeFileSync(mdxPath, mdxContent);
      updated++;

      if (updated % 50 === 0) {
        console.log(`✅ Progress: ${updated} icons updated...`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${brand}:`, error.message);
      failed++;
    }
  }

  console.log(`\n🎉 SEO Content Generation Complete!`);
  console.log(`   ✅ Updated: ${updated} icons`);
  console.log(`   ❌ Failed: ${failed} icons`);
  console.log(`   📊 Total processed: ${updated + failed} icons`);
}

if (require.main === module) {
  generateSEOContent();
}

module.exports = { generateSEOContent, categoryTemplates };
