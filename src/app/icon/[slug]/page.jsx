'use client';
import React from 'react';
import { icons } from '@/lib/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';

const page = ({ params }) => {
  const { slug } = params;

  // Find all variants of the icon
  const iconVariants = icons.filter(
    (icon) => icon.name.toLowerCase().split('-')[0] === slug.toLowerCase(),
  );

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
    <div className="mx-auto w-full px-4 py-8 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {iconVariants[0].name.split('-')[0]}
        </h1>
        <Link href="/icon">
          <Button variant="outline">Back to Icons</Button>
        </Link>
      </div>
      <p className="mb-4">
        <strong>ChatGPT</strong> is an AI chatbot developed by OpenAI, based on
        the GPT (Generative Pre-trained Transformer) architecture. It's widely
        used for generating human-like responses and performing tasks like
        writing, coding, and more.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {iconVariants.map((variant, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-4 rounded-xl border bg-[#faf9f5] p-6"
          >
            <img
              src={`/icons/${variant.category}/${variant.brand}/${variant.fileName}`}
              alt={variant.name}
              className="h-24 w-24 object-contain"
            />
            <div className="flex flex-wrap gap-3">
              <Button
                variant={'outline'}
                onClick={() =>
                  downloadSVG(
                    `/icons/${variant.category}/${variant.brand}/${variant.fileName}`,
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
                    `/icons/${variant.category}/${variant.brand}/${variant.fileName}`,
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
                href={`/icon/${relatedIcon.name.split('-')[0]}`}
                className="flex flex-col items-center gap-2 rounded-lg border p-3 transition hover:shadow-md"
              >
                <img
                  src={`/icons/${relatedIcon.category}/${relatedIcon.brand}/${relatedIcon.fileName}`}
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
  );
};

export default page;
