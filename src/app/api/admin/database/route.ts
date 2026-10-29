import { NextRequest, NextResponse } from 'next/server';
import { getConnectionInfo, connectToDatabase } from '@/lib/mongodb';
import { forceSeedDatabase, getDatabaseSummary } from '@/lib/services/storeService';
import { getAdminSession } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const info = await getConnectionInfo();
    const summary = await getDatabaseSummary();

    return NextResponse.json({
      success: true,
      data: {
        ...info,
        ...summary,
        isAtlas: info.host ? info.host.includes('mongodb.net') : false,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to inspect database', error: error.message },
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
    const { action, uri } = body;

    if (action === 'seed') {
      const result = await forceSeedDatabase();
      return NextResponse.json({
        success: true,
        message: `Successfully seeded database with ${result.seededCategories} categories and ${result.seededProducts} artisan sweets!`,
        data: result,
      });
    }

    if (action === 'connect') {
      if (!uri || !uri.trim()) {
        return NextResponse.json({ success: false, message: 'MongoDB connection URI is required' }, { status: 400 });
      }

      const trimmedUri = uri.trim();

      // Test connection
      const conn = await connectToDatabase(trimmedUri);
      if (!conn || conn.connection.readyState !== 1) {
        return NextResponse.json(
          {
            success: false,
            message: 'Connection failed. Please check the username, password, and cluster host.',
          },
          { status: 400 }
        );
      }

      // Persist to .env.local
      try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        let content = '';
        if (fs.existsSync(envPath)) {
          content = fs.readFileSync(envPath, 'utf8');
        }

        if (content.includes('MONGODB_URI=')) {
          content = content.replace(/MONGODB_URI=.*/, `MONGODB_URI=${trimmedUri}`);
        } else {
          content += `\nMONGODB_URI=${trimmedUri}\n`;
        }
        fs.writeFileSync(envPath, content, 'utf8');
        process.env.MONGODB_URI = trimmedUri;
      } catch (err: any) {
        console.warn('Could not write to .env.local:', err.message);
      }

      const info = await getConnectionInfo();
      const summary = await getDatabaseSummary();

      return NextResponse.json({
        success: true,
        message: 'Successfully connected to MongoDB and updated configuration!',
        data: {
          ...info,
          ...summary,
          isAtlas: info.host ? info.host.includes('mongodb.net') : false,
        },
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Operation failed' },
      { status: 500 }
    );
  }
}
