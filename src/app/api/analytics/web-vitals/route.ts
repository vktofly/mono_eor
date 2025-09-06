import { NextRequest, NextResponse } from 'next/server';

interface WebVitalData {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
  url: string;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    const data: WebVitalData = await request.json();
    
    // Validate the data
    if (!data.name || typeof data.value !== 'number' || !data.id) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Log the Web Vitals data (in production, you'd send this to your analytics service)
    console.log('Web Vitals:', {
      metric: data.name,
      value: data.value,
      url: data.url,
      timestamp: new Date(data.timestamp).toISOString(),
    });

    // Here you would typically send the data to your analytics service
    // Examples:
    // - Google Analytics 4
    // - Mixpanel
    // - Custom analytics database
    // - DataDog
    // - New Relic

    // For now, we'll just log it and return success
    return NextResponse.json({ 
      success: true, 
      message: 'Web Vitals data received',
      metric: data.name,
      value: data.value 
    });

  } catch (error) {
    console.error('Error processing Web Vitals data:', error);
    return NextResponse.json({ 
      error: 'Failed to process Web Vitals data' 
    }, { status: 500 });
  }
}

// Handle GET requests for health check
export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    service: 'Web Vitals Analytics',
    timestamp: new Date().toISOString()
  });
}
