import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/services/storeService';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const isFeatured = searchParams.get('isFeatured') === 'true' ? true : undefined;
    const isBestSeller = searchParams.get('isBestSeller') === 'true' ? true : undefined;
    const isAvailable = searchParams.get('isAvailable') === 'true' ? true : undefined;
    const sort = (searchParams.get('sort') as any) || undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 50;

    const result = await getProducts({
      category,
      search,
      minPrice,
      maxPrice,
      isFeatured,
      isBestSeller,
      isAvailable,
      sort,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      data: result.products,
      pagination: {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch sweets', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized admin request' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, message: 'Name, price, and category are required' },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newProduct = await createProduct({
      ...body,
      slug,
      price: Number(body.price),
      stock: Number(body.stock || 50),
      images: body.images && body.images.length > 0 ? body.images : ['/images/hero-sweets.jpg'],
      weightOptions: body.weightOptions || [
        { label: '250g', price: Number(body.price) },
        { label: '500g', price: Math.round(Number(body.price) * 1.9) },
        { label: '1kg', price: Math.round(Number(body.price) * 3.6) },
      ],
    });

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
