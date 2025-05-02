'use client';
import IconCard from '@/components/IconCard';
import React, { useState } from 'react';
import { icons } from '@/lib/icons';

const page = () => {
  const [search, setSearch] = useState('');

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
          <div key={index} onClick={() => openModal(baseName)}>
            <IconCard icon={groupedIcons[baseName][0]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
