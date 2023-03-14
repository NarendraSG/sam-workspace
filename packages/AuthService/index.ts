export const controller = async function (event: any) {
    const token = event.authorizationToken.toLowerCase();
    const methodArn = event.methodArn;
  
    let response;
    switch (token) {
      case "allow":
        response = generateAuthResponse("user", "Allow", methodArn);
        break;
      default:
        response = generateAuthResponse("user", "Deny", methodArn);
    }
  
    return response;
  };
  
  function generateAuthResponse(principalId: any, effect: any, methodArn: any) {
    const policyDocument = generatePolicyDocument(effect, methodArn);
  
    return {
      principalId,
      policyDocument,
    };
  }
  
  function generatePolicyDocument(effect: any, methodArn: any) {
    if (!effect || !methodArn) return null;
  
    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: methodArn,
        },
      ],
    };
  
    return policyDocument;
  }
  