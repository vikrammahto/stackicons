'use client';
import React, { useState, useEffect } from 'react';
import { icons } from '@/lib/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import MDXRenderer from '@/components/MDXRenderer';
import StructuredData from '@/components/StructuredData';
import Head from 'next/head';

const IconPage = ({ params }) => {
  const [slug, setSlug] = useState(null);
  const [mdxContent, setMdxContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iconVariants, setIconVariants] = useState([]);

  useEffect(() => {
    const initializeSlug = async () => {
      const resolvedParams = await params;
      const resolvedSlug = resolvedParams.slug;
      setSlug(resolvedSlug);

      // Find all variants of the icon
      const variants = icons.filter((icon) => icon.slug === resolvedSlug);
      setIconVariants(variants);
    };

    initializeSlug();
  }, [params]);

  useEffect(() => {
    const fetchMDXContent = async () => {
      if (!slug) return;

      try {
        const response = await fetch(`/api/mdx/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setMdxContent(data);
        }
      } catch (error) {
        console.error('Error fetching MDX content:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchMDXContent();
    }
  }, [slug]);

  const downloadSVG = (filePath, fileName) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copySVG = async (filePath) => {
    try {
      const res = await fetch(filePath);
      const svgText = await res.text();
      await navigator.clipboard.writeText(svgText);
      alert('✅ SVG copied to clipboard!');
    } catch (err) {
      console.error('❌ Copy failed:', err);
      alert('❌ Failed to copy SVG.');
    }
  };

  if (!slug) {
    return (
      <div className="mx-auto w-full px-4 py-8 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="animate-pulse">
            <div className="mb-4 h-8 w-48 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!iconVariants.length) {
    return (
      <div className="mx-auto w-full px-4 py-8 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Icon not found</h1>
          <Link href="/icon">
            <Button variant="outline">Back to Icons</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Structured Data for SEO */}
      {mdxContent && iconVariants[0] && (
        <StructuredData icon={iconVariants[0]} mdxContent={mdxContent} />
      )}

      <div className="mx-auto w-full px-4 py-8 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <Link href="/icon" className='text-xs mb-3'>← Back to Icons</Link>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {iconVariants[0]?.name || slug}
          </h1>
          <div className="mb-8 flex items-center justify-between">
            {iconVariants[0]?.url && (
              <a
                href={iconVariants[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 underline hover:text-gray-800"
              >
                Visit Official Website{' '}
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

        {/* Icon Variants */}
        <div className="mb-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {iconVariants.map((variant, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-4 rounded-xl border bg-[#faf9f5] p-6"
              >
                <img
                  src={`/icons/${variant.category}/${variant.slug}/${variant.fileName}`}
                  alt={variant.name}
                  className="h-24 w-24 object-contain"
                />
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={'outline'}
                    onClick={() =>
                      downloadSVG(
                        `/icons/${variant.category}/${variant.slug}/${variant.fileName}`,
                        variant.fileName,
                      )
                    }
                  >
                    <Download /> Download
                  </Button>
                  <Button
                    className=""
                    onClick={() =>
                      copySVG(
                        `/icons/${variant.category}/${variant.slug}/${variant.fileName}`,
                      )
                    }
                  >
                    <Copy />
                    Copy SVG
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic MDX Content */}
        {loading ? (
          <div className="mb-8">
            <div className="animate-pulse">
              <div className="mb-4 h-8 w-1/3 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
          </div>
        ) : mdxContent ? (
          <div className="mb-8">
            <MDXRenderer
              content={mdxContent.content}
              frontmatter={mdxContent.frontmatter}
            />
          </div>
        ) : (
          <div className="mb-8">
            <p className="text-lg text-gray-600">
              No additional information available for this icon.
            </p>
          </div>
        )}
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Related Icons</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {icons
              .filter(
                (icon) =>
                  icon.category === iconVariants[0].category &&
                  icon.name.toLowerCase().split('-')[0] !== slug.toLowerCase(),
              )
              .slice(0, 12)
              .map((relatedIcon, idx) => (
                <Link
                  key={idx}
                  href={`/icon/${relatedIcon.slug}`}
                  className="flex flex-col items-center gap-2 rounded-lg border p-3 transition hover:shadow-md"
                >
                  <img
                    src={`/icons/${relatedIcon.category}/${relatedIcon.slug}/${relatedIcon.fileName}`}
                    alt={relatedIcon.name}
                    className="h-14 w-14 object-contain"
                  />
                  <p className="text-center text-xs text-gray-700">
                    {relatedIcon.name}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IconPage;
