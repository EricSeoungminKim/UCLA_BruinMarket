import { CognitoUserPool } from "amazon-cognito-identity-js";
const userpoolData = {
  // UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  // ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
  UserPoolId: "us-west-1_ilYUYrrs4",
  ClientId: "c0pbkurra8isiu4ik65893uur",
};
export default new CognitoUserPool(userpoolData);
