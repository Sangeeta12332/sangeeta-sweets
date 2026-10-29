import { NextRequest, NextResponse } from 'next/server';
import { updateCategory, deleteCategory } from '@/lib/services/storeService';
import { getAdminSession } from '@/lib/auth';

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

    const updated = await updateCategory(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update category' },
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
    const deleted = await deleteCategory(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Category not found or deletion failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}
