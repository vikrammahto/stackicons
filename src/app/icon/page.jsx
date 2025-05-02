'use client';
import IconCard from '@/components/IconCard';
import React, { useState, useEffect } from 'react';
import { icons } from '@/lib/icons';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const page = () => {
  const [search, setSearch] = useState('');
  const [selectedVariants, setSelectedVariants] = useState([]);

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
          <Sheet
            key={index}
            onOpenChange={(open) => {
              if (open) {
                setSelectedVariants(groupedIcons[baseName]);
              } else {
                setSelectedVariants([]);
              }
            }}
          >
            <SheetTrigger asChild>
              <div className='hover:cursor-pointer'>
                <IconCard icon={groupedIcons[baseName][0]} />
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{baseName} Variants</SheetTitle>
                <SheetDescription>
                  All available SVG versions of {baseName}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {selectedVariants.map((variant, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <img
                      src={`/icons/${variant.category}/${variant.brand}/${variant.fileName}`}
                      alt={variant.name}
                      className="h-16 w-16 object-contain"
                    />
                    <p className="text-center text-sm">{variant.name}</p>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
};

export default page;
