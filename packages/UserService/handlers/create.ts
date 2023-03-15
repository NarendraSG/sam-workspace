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

// Main Controller function for the API
const handler = async (
	event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
	const { body: userData } = event;

	logInfo('create.invoked', { userData });

	let response: APIGatewayProxyResult;
	try {
		const user = new User(userData as Object);

		await user.save();

		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Successfully created new User',
				data: user,
			}),
		};
	} catch (error: unknown) {
		logError('create.error', { userData }, error);

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
	UserServiceSchema.createUserSchema,
);