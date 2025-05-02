'use client';
import React from 'react';

const IconCard = ({ icon }) => {
  const imgSrc = `/icons/${icon.category}/${icon.brand}/${icon.fileName}`;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-[#faf9f5] p-4">
      <img
        src={imgSrc}
        alt={icon.name}
        className="mx-auto size-20 object-contain"
      />
      <p className="mt-2 text-center text-xs">{icon.name}</p>
    </div>
  );
};

export default IconCard;
