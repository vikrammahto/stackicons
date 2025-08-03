import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col bg-black text-white"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000',
      }}
    >
      <Header />
      <div className="mx-auto flex grow flex-col justify-between px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
        <section className="">
          <h1 className="text-3xl sm:text-8xl">
            A vibrant icon set for developers who design.
          </h1>
          <p className="mt-4 text-lg sm:text-2xl">
            Open-source SVG icons perfect for docs, dashboards, landing pages or
            anywhere pixels need personality.
          </p>

          <div className="mt-4 flex items-center gap-4">
            <Link
              href={'/icon'}
              className="inline-block rounded-lg border bg-white px-6 py-2 text-black hover:bg-gray-100 transition-all hover:border-white/30"
            >
              Explore icons
            </Link>
            <Link
              href="https://github.com/vikrammahto/stackicons"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-white/10 px-6 py-2 transition-all hover:border-white/30"
            >
              Source code
            </Link>
          </div>
        </section>
        <div className="text-xs">
          Made by{' '}
          <a
            href="https://vikrammahto.com/?ref=stackicons"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vikram Mahto
          </a>{' '}
          |{' '}
          <a
            href="http://buymeacoffee.com/vikram"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy me a coffee
          </a>
        </div>
      </div>
    </div>
  );
}
