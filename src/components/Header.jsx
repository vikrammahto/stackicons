import Link from 'next/link';
import React from 'react';

const Header = () => {
  const tweetText = encodeURIComponent(
    `Awesome colored icon set for devs: StackIcons by @here_vikram! Perfect for docs, dashboards & more.\n\n https://github.com/vikrammahto/stackicons`,
  );

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  return (
    <nav className="mx-auto flex w-full items-center justify-between px-4 py-8 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
      <Link href="/" className="text-2xl font-medium">
        StackIcons
      </Link>
      <Link
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg border border-white/10 px-6 py-2 transition-all hover:border-white"
      >
        Share on X
      </Link>
    </nav>
  );
};

export default Header;
