import { NextRequest } from 'next/server';
import { handleRequest } from '@/helpers/middleware';
import { auth } from '@/middlewares/auth';
import { dataTemplate } from '@/helpers/returned_response_template';

const GET_ACTION = async (req: NextRequest & { passedData?: any }, extra) => {
	console.log(req.passedData);
	console.log(extra);
	return dataTemplate({
		message: 'Hello World!',
	}, 200);
};

export async function GET(req: NextRequest, extra) {
	return await handleRequest(req, extra, GET_ACTION, [auth]);
}