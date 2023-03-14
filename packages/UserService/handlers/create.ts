import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import * as dynamoose from "dynamoose";
import { User } from "../userModel";

if (process.env.STAGE != "local") {
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    region: process.env.ENVIRONMENT,
  });
  dynamoose.aws.ddb.set(ddb);
} else {
  dynamoose.aws.ddb.local("http://docker.for.mac.localhost:8000/");
}

// Main Controller function for the API
export const controller = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { body } = event;

  const userData = JSON.parse(body as string);

  const user = new User(userData);
  

  await user.save();

  let response: APIGatewayProxyResult;
  try {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `created user`,
        data: user,
      }),
    };
  } catch (err: unknown) {
    console.error(err);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: err instanceof Error ? err.message : "some error happened",
      }),
    };
  }

  return response;
};
