// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const { path } = params;
  console.log('Path:', path);
  
  const targetUrl = `http://localhost:3000/embedded/${path.join('/')}`;
  console.log('Target URL:', targetUrl);

  try {
    const response = await fetch(targetUrl);
    console.log('Response Status:', response.status);
    
    if (!response.ok) {
      return new NextResponse('Error fetching content', { status: response.status });
    }

    const data = await response.text();
    return new NextResponse(data, {
      headers: { 'Content-Type': 'text/html' },
      status: response.status,
    });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}