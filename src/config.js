const config = {
    s3: {
      REGION: "eu-west-1",
      BUCKET: "videos-app-upload",
    },
    apiGateway: {
      REGION: "eu-west-1",
      URL: "https://lumyfxaec3.execute-api.eu-west-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "Yeu-west-1",
      USER_POOL_ID: "eu-west-1_a2qGtuIN1",
      APP_CLIENT_ID: "3e1jkchk4u4b2r2hvtffo35g6c",
      IDENTITY_POOL_ID: "eu-west-1:c4c5ac45-9fdc-42ba-b869-5060911135e1",
    },
  };
  
  export default config;