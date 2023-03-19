import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as dynamoose from 'dynamoose';
import { User } from '../userModel';
import { logInfo, logError } from '../loggers';
import { createUserMiddleware, UserServiceSchema } from '../middlewares';
if (process.env.STAGE != 'local') {
	const ddb = new dynamoose.aws.ddb.DynamoDB({
		region: process.env.ENVIRONMENT,
	});
	dynamoose.aws.ddb.set(ddb);
} else {
	dynamoose.aws.ddb.local('http://docker.for.mac.localhost:8000/');
}

export const controller = async (
	event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
	logInfo('getAll.invoked', {});
	let response: APIGatewayProxyResult;
	try {
		const users = await User.scan().exec();

		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'List Users',
				users,
			}),
		};
	} catch (error: unknown) {
		logError('getAll.error', {}, error);
		response = {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Internal Failure',
			}),
		};
	}

	return response;
};
