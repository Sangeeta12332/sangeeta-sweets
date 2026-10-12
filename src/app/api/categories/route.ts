import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/services/storeService';

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
