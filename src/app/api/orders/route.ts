import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrders } from '@/lib/services/storeService';
import { getAdminSession } from '@/lib/auth';

// Helper validators for Indian customer details
function isValidIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-+]/g, '');
  // Match 10 digits or 91 + 10 digits
  return /^(91)?[6-9]\d{9}$/.test(cleaned);
}

function isValidIndianPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;

    const orders = await getOrders(status);
    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve orders', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { customer, shippingAddress, items, paymentMethod, deliveryInstructions } = body;

    // 1. Validate customer
    if (!customer || !customer.name || customer.name.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'Please enter a valid customer name' }, { status: 400 });
    }

    if (!customer.phone || !isValidIndianPhone(customer.phone)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid 10-digit Indian mobile number' },
        { status: 400 }
      );
    }

    if (!customer.email || !isValidEmail(customer.email)) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address' }, { status: 400 });
    }

    // 2. Validate shipping address
    if (!shippingAddress || !shippingAddress.address || shippingAddress.address.trim().length < 5) {
      return NextResponse.json({ success: false, message: 'Please enter complete delivery street address' }, { status: 400 });
    }

    if (!shippingAddress.city || shippingAddress.city.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'Please enter delivery city' }, { status: 400 });
    }

    if (!shippingAddress.state || shippingAddress.state.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'Please select or enter state' }, { status: 400 });
    }

    if (!shippingAddress.pincode || !isValidIndianPincode(shippingAddress.pincode)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid 6-digit Indian postal PIN code' },
        { status: 400 }
      );
    }

    // 3. Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Your shopping cart is empty' }, { status: 400 });
    }

    // 4. Server-side validation and order creation (never trusting client prices)
    const order = await createOrder({
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        email: customer.email.trim().toLowerCase(),
      },
      shippingAddress: {
        address: shippingAddress.address.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        pincode: shippingAddress.pincode.trim(),
      },
      items: items.map((i: any) => ({
        productId: i.productId || i.id,
        quantity: Math.max(1, parseInt(i.quantity, 10) || 1),
        weight: i.weight || 'Standard',
      })),
      paymentMethod: paymentMethod === 'Pay Online' ? 'Pay Online' : 'Cash on Delivery',
      deliveryInstructions: deliveryInstructions?.trim() || '',
    });

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to place order' },
      { status: 400 }
    );
  }
}
