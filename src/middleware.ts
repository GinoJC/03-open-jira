import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('entra al middleware', req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    console.log('entra al if');

    const id = req.nextUrl.pathname.replace('/api/entries/', '');
    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');
    if (!checkMongoIDRegExp.test(id)) {
      console.log('dentro del test');

      const url = req.nextUrl.clone();
      url.pathname = '/api/bad-request';
      url.search = `?message=El id ${id} no es válido`;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path', '/api/entries', '/api/entries/:path'],
};
