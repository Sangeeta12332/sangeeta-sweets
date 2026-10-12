import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, getOrderByNumber, updateOrderStatus } from '@/lib/services/storeService';
import { getAdminSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let order = await getOrderByNumber(id);
    if (!order) {
      order = await getOrderById(id);
    }

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve order', error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

    const statusToUpdate = body.status || body.orderStatus;
    if (!statusToUpdate) {
      return NextResponse.json({ success: false, message: 'Status field is required' }, { status: 400 });
    }

    const updated = await updateOrderStatus(id, statusToUpdate);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Order not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update order status' },
      { status: 400 }
    );
  }
}
