import { Figtree } from 'next/font/google';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

export const metadata = {
  title: 'StackIcons',
  description:
    'Open-source SVG icons perfect for docs, dashboards, landing pages or anywhere pixels need personality.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${figtree.className} antialiased`}>{children}</body>
    </html>
  );
}
