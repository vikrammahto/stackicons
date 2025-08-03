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
          <div className="mb-6 flex items-start gap-4">
            <div className="flex-1">
              <h1 className="mb-2 text-4xl font-bold text-gray-900">
                {frontmatter.title}
              </h1>
              {frontmatter.url && (
                <a
                  href={frontmatter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 underline transition-colors hover:text-blue-800"
                >
                  Visit Website
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {frontmatter.description && (
            <div className="mb-6 border-l-4 border-blue-400 bg-blue-50 p-4">
              <p className="leading-relaxed text-gray-800">
                <strong className="text-blue-800">{frontmatter.title}</strong> -{' '}
                {frontmatter.description}
              </p>
            </div>
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
