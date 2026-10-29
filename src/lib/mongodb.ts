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

export async function connectToDatabase(overrideUri?: string): Promise<typeof mongoose | null> {
  const uri = overrideUri || process.env.MONGODB_URI;

  if (!uri) {
    // If MONGODB_URI is not provided, return null gracefully so fallback store can handle it
    return null;
  }

  if (!overrideUri && cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (overrideUri && cached.conn) {
    try {
      await mongoose.disconnect();
    } catch (e) {
      // Ignore disconnect errors
    }
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((m) => {
        return m;
      })
      .catch((err) => {
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

export async function getConnectionInfo() {
  const connected = isDbConnected();
  if (!connected || !cached.conn) {
    return {
      isConnected: false,
      readyState: cached?.conn?.connection?.readyState || 0,
      database: null,
      host: null,
      pingMs: null,
      uriMasked: process.env.MONGODB_URI
        ? process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@')
        : null,
    };
  }

  const startTime = Date.now();
  let pingMs = 0;
  try {
    if (cached.conn.connection.db) {
      await cached.conn.connection.db.admin().ping();
      pingMs = Date.now() - startTime;
    }
  } catch (e) {
    pingMs = -1;
  }

  return {
    isConnected: true,
    readyState: cached.conn.connection.readyState,
    database: cached.conn.connection.name || 'sangita_mithai',
    host: cached.conn.connection.host || 'MongoDB Cluster',
    pingMs,
    uriMasked: process.env.MONGODB_URI
      ? process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@')
      : null,
  };
}
