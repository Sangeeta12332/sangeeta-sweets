import { NextResponse } from 'next/server';
import { getAdminStats } from '@/lib/services/storeService';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getAdminStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve admin stats', error: error.message },
      { status: 500 }
    );
  }
}
