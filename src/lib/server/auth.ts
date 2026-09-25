import { cookies } from 'next/headers';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export type AppRole = 'customer' | 'admin';

export interface AppUser {
  id: string;
  username: string;
  email?: string;
  passwordHash: string;
  role: AppRole;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  username: string;
  email?: string;
  role: AppRole;
  createdAt: string;
}

const SESSION_COOKIE_NAME = 'rnt_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24;
const USERS_STORE_PATH = path.join(process.cwd(), 'src', 'data', 'users-store.json');

function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin',
  };
}

function ensureDirectory() {
  return fs.mkdir(path.dirname(USERS_STORE_PATH), { recursive: true });
}

async function readUsersStore(): Promise<AppUser[]> {
  await ensureDirectory();

  try {
    const file = await fs.readFile(USERS_STORE_PATH, 'utf8');
    const parsed = JSON.parse(file) as Array<Partial<AppUser> & { role?: string }>;
    if (Array.isArray(parsed)) {
      return parsed.map((user): AppUser => ({
        id: String(user.id ?? 'user-' + Date.now()),
        username: String(user.username ?? 'guest'),
        email: user.email,
        passwordHash: String(user.passwordHash ?? ''),
        role: user.role === 'admin' ? 'admin' : 'customer',
        createdAt: String(user.createdAt ?? new Date().toISOString()),
      }));
    }
  } catch {
    // ignore missing store; seed admin on first run
  }

  const adminCredentials = getAdminCredentials();
  const adminUser: AppUser = {
    id: 'admin-root',
    username: adminCredentials.username,
    email: 'admin@rntfootwear.com',
    passwordHash: await bcrypt.hash(adminCredentials.password, 10),
    role: 'admin',
    createdAt: new Date().toISOString(),
  };

  await fs.writeFile(USERS_STORE_PATH, JSON.stringify([adminUser], null, 2), 'utf8');
  return [adminUser];
}

async function writeUsersStore(users: AppUser[]) {
  await ensureDirectory();
  await fs.writeFile(USERS_STORE_PATH, JSON.stringify(users, null, 2), 'utf8');
}

export async function ensureSeededUsers() {
  const users = await readUsersStore();
  const adminCredentials = getAdminCredentials();
  const adminExists = users.some(user => user.role === 'admin' || user.username.toLowerCase() === adminCredentials.username.toLowerCase());

  if (!adminExists) {
    const seeded: AppUser[] = [
      ...users,
      {
        id: `admin-${Date.now()}`,
        username: adminCredentials.username,
        email: 'admin@rntfootwear.com',
        passwordHash: await bcrypt.hash(adminCredentials.password, 10),
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
    ];

    await writeUsersStore(seeded);
    return seeded;
  }

  return users;
}

export async function getAllUsers(): Promise<AppUser[]> {
  return ensureSeededUsers();
}

export function toPublicUser(user: AppUser): PublicUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export async function registerUser(input: { username: string; email?: string; password: string }) {
  const username = input.username.trim();
  const email = input.email?.trim();
  const password = input.password;

  if (!username || username.length < 3) {
    throw new Error('Username must be at least 3 characters long.');
  }

  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  const users = await getAllUsers();
  const lowerUsername = username.toLowerCase();
  const existing = users.find(user => user.username.toLowerCase() === lowerUsername);
  if (existing) {
    throw new Error('Username is already taken.');
  }

  const newUser: AppUser = {
    id: `usr-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    username,
    email,
    passwordHash: await bcrypt.hash(password, 10),
    role: 'customer',
    createdAt: new Date().toISOString(),
  };

  await writeUsersStore([...users, newUser]);
  return newUser;
}

export async function loginUser(input: { username: string; password: string }) {
  const users = await getAllUsers();
  const user = users.find(entry => entry.username.toLowerCase() === input.username.trim().toLowerCase());

  if (!user) {
    throw new Error('Invalid username or password.');
  }

  const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error('Invalid username or password.');
  }

  return user;
}

export function signSession(user: AppUser) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + SESSION_TTL_MS,
  })).toString('base64url');

  const signature = crypto
    .createHmac('sha256', process.env.SESSION_SECRET || 'rnt-footwear-dev-secret')
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

export function verifySession(token: string) {
  try {
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) {
      return null;
    }

    const expected = crypto
      .createHmac('sha256', process.env.SESSION_SECRET || 'rnt-footwear-dev-secret')
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (expected !== signature) {
      return null;
    }

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      sub: string;
      username: string;
      role: AppRole;
      exp: number;
    };

    if (decoded.exp < Date.now()) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = verifySession(token);
  if (!session) {
    return null;
  }

  const users = await getAllUsers();
  const user = users.find(entry => entry.id === session.sub);
  return user ?? null;
}

export async function requireAdminUser(): Promise<AppUser | null> {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') {
    return null;
  }

  return user;
}

export function setSessionCookie(response: Response | { cookies: { set: (options: Record<string, unknown>) => void } }, user: AppUser) {
  const token = signSession(user);

  if ('cookies' in response && typeof response.cookies?.set === 'function') {
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_TTL_MS / 1000,
    });
  }
}

export function clearSessionCookie(response: Response | { cookies: { set: (options: Record<string, unknown>) => void } }) {
  if ('cookies' in response && typeof response.cookies?.set === 'function') {
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: '',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
    });
  }
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}
