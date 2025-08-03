'use client';
import IconCard from '@/components/IconCard';
import React, { useState, useEffect } from 'react';
import { icons } from '@/lib/icons';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';

const page = () => {
  const [search, setSearch] = useState('');
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    console.log('Selected variants:', selectedVariants);
  }, [selectedVariants]);

  const groupIconsByBaseName = (icons) => {
    const grouped = {};
    icons.forEach((icon) => {
      const baseName = icon.name.split('-')[0];
      if (!grouped[baseName]) {
        grouped[baseName] = [];
      }
      grouped[baseName].push(icon);
    });
    return grouped;
  };

  const groupedIcons = groupIconsByBaseName(icons);

  const filteredIcons = Object.keys(groupedIcons).filter((baseName) =>
    baseName.toLowerCase().includes(search.toLowerCase()),
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

  return (
    <div className="mx-auto w-full px-4 py-8 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
      <input
        type="text"
        placeholder="Search icons..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded border px-4 py-2"
      />

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {filteredIcons.map((baseName, index) => (
          <div key={index}>
            <Dialog>
              <DialogTrigger asChild>
                <div className="hover:cursor-pointer">
                  <IconCard icon={groupedIcons[baseName][0]} />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className={'sr-only'}>
                    {baseName} Variants
                  </DialogTitle>
                  <DialogDescription className={'sr-only'}>
                    All available SVG versions of {baseName}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex w-full items-start gap-6">
                    <div className="rounded-lg border p-3">
                      <img
                        src={`/icons/${groupedIcons[baseName][0].category}/${groupedIcons[baseName][0].slug}/${groupedIcons[baseName][0].fileName}`}
                        alt={groupedIcons[baseName][0].name}
                        className="h-32 max-h-32 w-32 max-w-32 object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {groupedIcons[baseName][0].name}
                      </h2>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {[...new Set(groupedIcons[baseName][0].keywords)].map(
                          (keyword, index) => (
                            <span
                              key={index}
                              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                            >
                              {keyword}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ms-auto flex flex-wrap gap-3">
                    <Button
                      variant={'outline'}
                      onClick={() =>
                        downloadSVG(
                          `/icons/${groupedIcons[baseName][0].category}/${groupedIcons[baseName][0].slug}/${groupedIcons[baseName][0].fileName}`,
                          groupedIcons[baseName][0].fileName,
                        )
                      }
                    >
                      <Download /> Download
                    </Button>
                    <Button
                      className=""
                      onClick={() => {
                        copySVG(
                          `/icons/${groupedIcons[baseName][0].category}/${groupedIcons[baseName][0].slug}/${groupedIcons[baseName][0].fileName}`,
                        );
                        console.log('SVG copied:', {
                          category: groupedIcons[baseName][0].keywords,
                        });
                      }}
                    >
                      <Copy />
                      Copy SVG
                    </Button>
                  </div>

                  <div className="flex justify-center">
                    <Link href={`/icon/${groupedIcons[baseName][0].slug}`}>
                      <Button variant="ghost" className={'text-blue-500'}>
                        See more icon variants
                      </Button>
                    </Link>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
