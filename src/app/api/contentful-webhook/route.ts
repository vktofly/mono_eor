import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sys, fields } = body;

    // Verify webhook secret (optional but recommended)
    const secret = request.headers.get('x-contentful-webhook-secret');
    if (process.env.CONTENTFUL_WEBHOOK_SECRET && secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid webhook secret' }, { status: 401 });
    }

    const contentType = sys?.contentType?.sys?.id;
    const entryId = sys?.id;

    console.log(`Contentful webhook received: ${contentType} - ${entryId}`);

    // Revalidate based on content type
    switch (contentType) {
      case 'siteSettings':
        // Revalidate all pages when site settings change
        revalidateTag('site-settings');
        revalidatePath('/', 'layout');
        break;

      case 'page':
        // Revalidate specific page
        if (fields?.slug) {
          revalidatePath(`/${fields.slug}`);
        }
        revalidatePath('/', 'layout'); // Also revalidate home page for navigation
        break;

      case 'blogPost':
        // Revalidate blog pages
        revalidatePath('/resources');
        revalidatePath('/blog');
        if (fields?.slug) {
          revalidatePath(`/blog/${fields.slug}`);
        }
        break;

      case 'guide':
        // Revalidate resources page
        revalidatePath('/resources');
        if (fields?.slug) {
          revalidatePath(`/resources/${fields.slug}`);
        }
        break;

      case 'testimonial':
      case 'testimonialSection':
        // Revalidate pages that might show testimonials
        revalidatePath('/eor-india');
        revalidatePath('/about');
        break;

      case 'pricingTier':
      case 'pricingTableSection':
        // Revalidate pricing page
        revalidatePath('/pricing');
        break;

      default:
        // For unknown content types, revalidate all pages
        revalidatePath('/', 'layout');
        break;
    }

    return NextResponse.json({ 
      message: 'Webhook processed successfully',
      contentType,
      entryId,
      revalidated: true
    });

  } catch (error) {
    console.error('Contentful webhook error:', error);
    return NextResponse.json({ 
      message: 'Webhook processing failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Handle GET requests for webhook verification
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Contentful webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}
