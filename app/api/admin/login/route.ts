import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  const {password} = await req.json();

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('❌ ADMIN_PASSWORD is not set on server environment');
    return new NextResponse('Server config error', {status: 500});
  }

  if (password !== adminPassword) {
    return new NextResponse('Invalid password', {status: 401});
  }

  const response = new NextResponse('OK', {status: 200});

  const isLocalhost = process.env.NODE_ENV !== 'production';

  response.cookies.set({
    name: 'admin-auth',
    value: 'true',
    secure: !isLocalhost,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
