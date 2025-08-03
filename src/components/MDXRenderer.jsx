'use client';
import React from 'react';

const MDXRenderer = ({ content, frontmatter }) => {
  if (!content) {
    return null;
  }

  // Enhanced markdown-to-HTML conversion
  const formatContent = (text) => {
    return text
      .split('\n\n')
      .map((paragraph, index) => {
        const trimmed = paragraph.trim();

        if (!trimmed) return null;

        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={index} className="mb-4 text-2xl font-bold text-gray-800">
              {trimmed.replace('# ', '')}
            </h1>
          );
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="mb-3 text-xl font-semibold text-gray-800"
            >
              {trimmed.replace('## ', '')}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={index} className="mb-2 text-lg font-medium text-gray-700">
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        // Handle bold text **text**
        let formattedText = trimmed.replace(
          /\*\*(.*?)\*\*/g,
          '<strong>$1</strong>',
        );

        // Handle italic text *text*
        formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Handle inline code `code`
        formattedText = formattedText.replace(
          /`(.*?)`/g,
          '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>',
        );

        // Handle links [text](url)
        formattedText = formattedText.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>',
        );

        return (
          <p
            key={index}
            className="mb-4 leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      })
      .filter(Boolean);
  };

  return (
    <div className="mdx-content">
      {frontmatter?.title && (
        <div className="mb-8">
          {frontmatter.description && (
            <p className="leading-relaxed text-gray-800">
              <strong className="text-gray-800">{frontmatter.title}</strong> -{' '}
              {frontmatter.description}
            </p>
          )}
        </div>
      )}

      <div className="prose prose-gray max-w-none">
        {formatContent(content)}
      </div>

      {frontmatter?.keywords && frontmatter.keywords.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="mb-3 text-sm font-medium text-gray-500">
            Related Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {frontmatter.keywords.map((keyword, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MDXRenderer;
