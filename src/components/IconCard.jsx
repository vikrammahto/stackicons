'use client';
import React, { useState } from 'react';

const IconCard = ({ icon }) => {
  const [showDetails, setShowDetails] = useState(false);
  const imgSrc = `/icons/${icon.category}/${icon.slug}/${icon.fileName}`;

  return (
    <div
      className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-transparent bg-[#faf9f5] p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-lg"
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="flex flex-col items-center space-y-2">
        <img
          src={imgSrc}
          alt={icon.name}
          className="mx-auto size-16 object-contain transition-transform duration-200 group-hover:scale-110"
        />
        <h3 className="text-center text-sm font-semibold text-gray-800">
          {icon.name}
        </h3>
      </div>
    </div>
  );
};

export default IconCard;
