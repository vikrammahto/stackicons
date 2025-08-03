import { NextResponse } from 'next/server';
import { getMDXContent } from '@/lib/mdx';

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const mdxContent = getMDXContent(slug);

    if (!mdxContent) {
      return NextResponse.json(
        { error: 'MDX content not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(mdxContent);
  } catch (error) {
    console.error('Error fetching MDX content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
