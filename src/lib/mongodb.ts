import mongoose from 'mongoose';

/**
 * MongoDB connection cache for Next.js hot-reloading environment.
 * Ensures connection is reused across serverless invocations and dev recompilations.
 */

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    // If MONGODB_URI is not provided, return null gracefully so fallback store can handle it
    return null;
  }

  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Quick timeout to prevent hanging when offline
    };

    cached.promise = mongoose.connect(uri, opts).then((m) => {
      return m;
    }).catch((err) => {
      cached.promise = null;
      console.warn('MongoDB connection attempt failed:', err.message);
      return null as unknown as typeof mongoose;
    });
  }

  try {
    const conn = await cached.promise;
    if (conn && conn.connection && conn.connection.readyState === 1) {
      cached.conn = conn;
      return cached.conn;
    }
    return null;
  } catch (e) {
    cached.promise = null;
    return null;
  }
}

export function isDbConnected(): boolean {
  return !!(cached?.conn && cached.conn.connection.readyState === 1);
}
