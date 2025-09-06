import { NextRequest, NextResponse } from 'next/server';
import { contentfulPreviewService } from '@/lib/contentful';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // Check if slug is provided
  if (!slug) {
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
  }

  try {
    // Fetch the page from Contentful preview API
    const page = await contentfulPreviewService.getPageBySlug(slug);

    if (!page) {
      return NextResponse.json({ message: 'Page not found' }, { status: 404 });
    }

    // Enable preview mode
    const response = NextResponse.redirect(new URL(`/${slug}`, request.url));
    response.cookies.set('__prerender_bypass', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json({ message: 'Preview failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }

    // Enable preview mode
    const response = NextResponse.json({ success: true, slug });
    response.cookies.set('__prerender_bypass', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json({ message: 'Preview failed' }, { status: 500 });
  }
}
