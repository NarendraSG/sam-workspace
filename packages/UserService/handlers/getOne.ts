import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as dynamoose from 'dynamoose';
import { User } from '../userModel';
import { logInfo, logError } from 'loggers';
import { createUserMiddleware, UserServiceSchema } from 'middleware';

if (process.env.STAGE != 'local') {
	const ddb = new dynamoose.aws.ddb.DynamoDB({
		region: process.env.ENVIRONMENT,
	});
	dynamoose.aws.ddb.set(ddb);
} else {
	dynamoose.aws.ddb.local('http://docker.for.mac.localhost:8000/');
}

const handler = async (
	event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
	const {
		pathParameters: { id },
	} = event as any;

	logInfo('getOne.invoked', { id });

	let response: APIGatewayProxyResult;
	try {
		const user = await User.get({ id: parseInt(id) });
		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Get user',
				users: user || null,
			}),
		};
	} catch (error: unknown) {
		logError('getOne.error', { id }, error);
		response = {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Internal Failure',
			}),
		};
	}

	return response;
};

export const controller = createUserMiddleware(
	handler,
	UserServiceSchema.getUserSchema,
);
