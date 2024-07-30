import { MiddlewareResponse } from '@/helpers/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getServerAuthSession } from '@/lib/nextauthOptions';
import { dataTemplate } from '@/helpers/returned_response_template';

export async function auth(req: NextRequest, extra: any): Promise<MiddlewareResponse> {
	const session = await getServerAuthSession();
	if (!session?.user)
		return {
			pass: false,
			response: dataTemplate({
				error: 'Unauthorized',
			}, 401),
			data: null,
		};
	return {
		pass: true,
		response: NextResponse.next({
			request: {
				headers: new Headers(req.headers),
			},
		}),
		data: session.user,
	};
}