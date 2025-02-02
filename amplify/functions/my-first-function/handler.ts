import { APIGatewayEvent } from "aws-lambda";


export const handler = async (event: APIGatewayEvent) => {
  return "Hello from my first function!";
};