'use client';
import React from 'react';
import { icons } from '@/lib/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const page = ({ params }) => {
  const { slug } = params;

  // Find all variants of the icon
  const iconVariants = icons.filter(
    (icon) => icon.name.toLowerCase().split('-')[0] === slug.toLowerCase(),
  );

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
          {iconVariants[0].name.split('-')[0]} Variants
        </h1>
        <Link href="/icon">
          <Button variant="outline">Back to Icons</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {iconVariants.map((variant, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 rounded-xl border bg-white p-6"
          >
            <img
              src={`/icons/${variant.category}/${variant.brand}/${variant.fileName}`}
              alt={variant.name}
              className="h-24 w-24 object-contain"
            />
            <div className="text-center">
              <p className="font-medium">{variant.name}</p>
              <p className="text-sm text-gray-500">{variant.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
