'use client';
import IconCard from '@/components/IconCard';
import React, { useState } from 'react';
import { icons } from '@/lib/icons';

const page = () => {
  const [search, setSearch] = useState('');

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container py-8">
      <input
        type="text"
        placeholder="Search icons..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded border px-4 py-2"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {filteredIcons.map((icon, index) => (
          <IconCard key={index} icon={icon} />
        ))}
      </div>
    </div>
  );
};

export default page;
