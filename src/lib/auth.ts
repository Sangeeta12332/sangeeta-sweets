import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'sm_admin_session';

function getSecretKey(): string {
  return process.env.JWT_SECRET || 'sangita_mithai_dev_secret_key_default_2026';
}

export interface AdminSession {
  email: string;
  role: string;
  exp: number;
}

/**
 * Sign an admin session token using HMAC SHA-256
 */
export function signSessionToken(payload: { email: string; role?: string }): string {
  const secret = getSecretKey();
  const exp = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const data = JSON.stringify({ email: payload.email, role: payload.role || 'admin', exp });
  const encoded = Buffer.from(data).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

/**
 * Verify session token
 */
export function verifySessionToken(token: string): AdminSession | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [encoded, signature] = parts;
    const secret = getSecretKey();
    const expectedSignature = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');

    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
      if (parsed.exp && parsed.exp > Date.now()) {
        return parsed;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Verify admin credentials against environment variables or database
 */
export async function authenticateAdmin(email: string, pass: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@sangitamithai.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (!email || !pass) return false;
  return email.trim().toLowerCase() === adminEmail.trim().toLowerCase() && pass === adminPass;
}

/**
 * Check if the current request has a valid admin session (for Server Components and Route Handlers)
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) return null;
  return verifySessionToken(sessionCookie.value);
}

export { COOKIE_NAME };
