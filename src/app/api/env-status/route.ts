import { NextResponse } from 'next/server';
import { getEnvironmentStatus } from '@/lib/env-validation';

export async function GET() {
  try {
    const status = getEnvironmentStatus();
    
    return NextResponse.json({
      success: true,
      ...status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Environment status check failed:', error);
    
    return NextResponse.json({
      success: false,
      status: 'error',
      message: 'Failed to check environment status',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
