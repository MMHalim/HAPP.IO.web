import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, details, photoUrls, videoUrls } = body;

    if (!name || !email || !details) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Use the renamed model ProjectRequest
    const newRequest = await prisma.projectRequest.create({
      data: {
        name,
        email,
        phone,
        details,
        photoUrls: photoUrls || [],
        videoUrls: videoUrls || [],
      },
    });

    return NextResponse.json(newRequest, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating request:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit request' },
      { status: 500 }
    );
  }
}
