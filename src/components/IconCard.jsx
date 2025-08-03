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

        {icon.url && (
          <a
            href={icon.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 underline transition-colors duration-200 hover:text-blue-800"
            onClick={(e) => e.stopPropagation()}
          >
            Visit Website →
          </a>
        )}
      </div>

      {showDetails && icon.description && (
        <div className="absolute inset-0 z-10 flex flex-col justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(false);
            }}
            className="absolute top-2 right-2 text-lg text-gray-400 hover:text-gray-600"
          >
            ×
          </button>

          <div className="mb-3 flex items-center space-x-3">
            <img
              src={imgSrc}
              alt={icon.name}
              className="size-8 object-contain"
            />
            <h3 className="font-semibold text-gray-800">{icon.name}</h3>
          </div>

          <p className="line-clamp-4 text-xs leading-relaxed text-gray-600">
            {icon.description}
          </p>

          {icon.url && (
            <a
              href={icon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 self-start text-xs text-blue-600 underline hover:text-blue-800"
              onClick={(e) => e.stopPropagation()}
            >
              Visit Website →
            </a>
          )}
        </div>
      )}

      {!showDetails && icon.description && (
        <div className="absolute right-2 bottom-2 left-2">
          <p className="text-center text-xs text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Click for details
          </p>
        </div>
      )}
    </div>
  );
};

export default IconCard;
