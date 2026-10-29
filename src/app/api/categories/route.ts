import { NextRequest, NextResponse } from 'next/server';
import { getCategories, createCategory } from '@/lib/services/storeService';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to load categories', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ success: false, message: 'Category name is required' }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newCat = await createCategory({
      name: body.name,
      slug,
      description: body.description || '',
      image: body.image || '/images/hero-sweets.jpg',
      isActive: body.isActive !== undefined ? body.isActive : true,
    });

    return NextResponse.json({ success: true, data: newCat }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}
