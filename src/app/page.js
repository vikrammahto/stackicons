import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
      <div className="md:grid-cols-2-gap-10 grid grid-cols-1">
        <div>
          <h1 className="text-3xl sm:text-8xl">
            A vibrant icon set for developers who design.
          </h1>
          <p className="mt-4 text-lg sm:text-2xl">
            Open-source SVG icons perfect for docs, dashboards, landing pages or
            anywhere pixels need personality.
          </p>

          <Link
            href={'/icon'}
            className="inline-block mt-4 rounded-xl bg-white px-6 py-3 font-semibold text-black"
          >
            Explore icons
          </Link>
        </div>
      </div>
    </section>
  );
}
