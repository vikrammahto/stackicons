# Icon Metadata System

This project now supports custom metadata for each icon using MDX files. This allows you to add custom titles, descriptions, URLs, and other metadata for each icon.

## How it works

1. **MDX Files**: Each icon can have a corresponding MDX file in the `content/icons/` directory
2. **Metadata**: The frontmatter of each MDX file contains the icon's metadata
3. **Auto-generation**: The build system automatically reads these MDX files and includes the metadata in the generated `icons.js` file

## File Structure

```
content/
  icons/
    chatgpt.mdx
    react.mdx
    spotify.mdx
    ...
```

## MDX File Format

Each MDX file should follow this format:

```mdx
---
title: 'ChatGPT'
url: 'https://chat.openai.com'
description: 'ChatGPT is an AI-powered conversational assistant developed by OpenAI that can help with a wide range of tasks including writing, coding, analysis, and creative projects.'
category: 'ai'
brand: 'chatgpt'
keywords: ['ai', 'chatgpt', 'openai', 'assistant', 'conversational ai']
---

# ChatGPT

Additional content can go here (optional).
```

## Available Scripts

### Generate Icons

Regenerates the `icons.js` file with updated metadata:

```bash
npm run generate:icons
```

### Generate MDX Templates

Creates template MDX files for all icons that don't already have them:

```bash
npm run generate:mdx
```

### Update Metadata (Programmatic)

```bash
npm run update:metadata
```

## Manual Updates

### Single Icon Update

To update a single icon's metadata, edit the corresponding MDX file in `content/icons/`. For example, to update ChatGPT:

1. Edit `content/icons/chatgpt.mdx`
2. Update the frontmatter fields
3. Run `npm run generate:icons` to regenerate the icons file

### Bulk Updates

You can use the `scripts/update-icon-metadata.js` script to update multiple icons at once:

```javascript
const { bulkUpdateIcons } = require('./scripts/update-icon-metadata.js');

const updates = {
  github: {
    title: 'GitHub',
    url: 'https://github.com',
    description: 'GitHub is a platform for version control and collaboration.',
  },
  vscode: {
    title: 'Visual Studio Code',
    url: 'https://code.visualstudio.com',
    description:
      'Visual Studio Code is a lightweight but powerful source code editor.',
  },
};

bulkUpdateIcons(updates);
```

## Metadata Fields

| Field         | Type   | Required | Description                                                    |
| ------------- | ------ | -------- | -------------------------------------------------------------- |
| `title`       | string | No       | Display name for the icon (defaults to capitalized brand name) |
| `url`         | string | No       | Official website URL                                           |
| `description` | string | No       | Brief description of the brand/technology                      |
| `category`    | string | Yes      | Icon category (auto-populated)                                 |
| `brand`       | string | Yes      | Brand identifier (auto-populated)                              |
| `keywords`    | array  | No       | Additional search keywords                                     |

## UI Features

The updated IconCard component now supports:

- **Hover Effects**: Icons scale up on hover with smooth transitions
- **Click to Expand**: Click any icon to see its full description
- **Website Links**: Direct links to official websites when available
- **Overlay Details**: Full description appears in an overlay with close button
- **Visual Feedback**: Hover states and loading animations

## Example Icons with Metadata

Here are some examples of well-configured icons:

- **ChatGPT**: AI assistant with full description and website link
- **React**: JavaScript library with technical details
- **Spotify**: Music streaming service with user-focused description
- **PayPal**: Financial service with business description

## Best Practices

1. **Keep descriptions concise**: Aim for 1-2 sentences that clearly explain what the technology/brand does
2. **Use official URLs**: Always link to the official website or primary resource
3. **Add relevant keywords**: Include terms that users might search for
4. **Maintain consistency**: Use similar tone and structure across descriptions
5. **Update regularly**: Keep information current as technologies evolve

## Workflow

1. Add/edit MDX files in `content/icons/`
2. Run `npm run generate:icons` to update the data
3. Test the changes locally with `npm run dev`
4. The updated metadata will appear in the UI automatically
