import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as dynamoose from "dynamoose";
import { User } from "../userModel";
import { logInfo, logError } from "loggers";
import { createUserMiddleware, UserServiceSchema } from "middleware";

if (process.env.STAGE != "local") {
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    region: process.env.ENVIRONMENT,
  });
  dynamoose.aws.ddb.set(ddb);
} else {
  dynamoose.aws.ddb.local("http://docker.for.mac.localhost:8000/");
}

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const {
    pathParameters: { id },
  } = event as any;

  logInfo("delete.invoked", { id });

  await User.delete(parseInt(id));

  let response: APIGatewayProxyResult;
  try {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "User deletion Successfull!!!",
      }),
    };
  } catch (error: unknown) {
    logError("delete.error", { id }, error);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Failure",
      }),
    };
  }

  return response;
};

export const controller = createUserMiddleware(
  handler,
  UserServiceSchema.getUserSchema
);