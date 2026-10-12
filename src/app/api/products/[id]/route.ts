import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getProductBySlug, updateProduct, deleteProduct } from '@/lib/services/storeService';
import { getAdminSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let product = await getProductById(id);
    if (!product) {
      product = await getProductBySlug(id);
    }

    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve product', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await updateProduct(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteProduct(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Product not found or deletion failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product removed successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}
