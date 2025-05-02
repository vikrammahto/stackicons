'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Download, Copy } from 'lucide-react';
import { formatSvgToJsx } from '@/lib/svgUtils';

const IconCard = ({ icon }) => {
  const [copied, setCopied] = useState(false);

  const imgSrc = `/icons/${icon.category}/${icon.brand}/${icon.fileName}`;

  const copyToClipboard = (type) => {
    fetch(imgSrc)
      .then((response) => response.text())
      .then((svgContent) => {
        const html = svgContent;
        const jsx = formatSvgToJsx(svgContent);
        const textToCopy = type === 'jsx' ? jsx : html;

        navigator.clipboard.writeText(textToCopy).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      });
  };

  const downloadSVG = () => {
    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = icon.fileName;
    link.click();
  };
  return (
    <div className="rounded-xl border p-4">
      <img src={imgSrc} alt={icon.name} className="mx-auto size-8" />
      <p className="mt-2 text-center text-xs">{icon.name}</p>
      <div className="mt-4 flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard('html')}
        >
          <Copy className="mr-1 h-4 w-4" /> HTML
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard('jsx')}
        >
          <Copy className="mr-1 h-4 w-4" /> JSX
        </Button>
        <Button variant="outline" size="sm" onClick={downloadSVG}>
          <Download className="mr-1 h-4 w-4" /> SVG
        </Button>
      </div>
    </div>
  );
};

export default IconCard;
