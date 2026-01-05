
/*
* robert.jackson@pingidentity.com 2025-12-19
* 
* THE CODE HEREUNDER IS PROVIDED "AS IS" AND WITHOUT WARRANTY OF ANY KIND. SUCH CODE IS EXPRESSLY EXCLUDED FROM PING IDENTITY'S INDEMNITY 
* OR SUPPORT OBLIGATIONS, IF ANY, PURSUANT TO THE RELEVANT GOVERNING AGREEMENT. PING IDENTITY AND ITS LICENSORS EXPRESSLY DISCLAIM ALL WARRANTIES, 
* WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
* AND ANY WARRANTY OF NON-INFRINGEMENT. PING IDENTITY SHALL NOT HAVE ANY LIABILITY ARISING OUT OF OR RELATING TO ANY USE, IMPLEMENTATION OR 
* CONFIGURATION OF THE SAMPLE CODE.
*
* Node binding documentation found at: https://docs.pingidentity.com/pingoneaic/latest/am-scripting/script-bindings.html#common-utils
*/

var nodeOutcomes = {
  HAS_CREDENTIALS: "Has Credentials",
  NO_CREDENTIALS: "No Credentials",
  ERROR: "Script Error"
};

var nodeConfig = {
  logPrefix: "HTTPBasicAuthCustomNode:"
}

var authHeader = requestHeaders.get("Authorization").get(0);
if (authHeader) {
  var regex = /^Basic\s+([a-zA-Z0-9+\/=]+)$/gmi;
  var match = regex.exec(authHeader)
  if (match) {
    logger.debug("{} Basic Authorization header is present", nodeConfig.logPrefix);
    try {
      var decoded = utils.base64.decode(match[1]);
      var separatorIndex = decoded.indexOf(":");
      if (separatorIndex !== -1) {
        var username = decoded.substring(0, separatorIndex)
        var password = decoded.substring(separatorIndex + 1);
        nodeState.putShared("username", username);
        nodeState.putTransient("password", password);
        action.goTo(nodeOutcomes.HAS_CREDENTIALS);
      } else {
        logger.error("{} Decoded string does not contain a colon separator", nodeConfig.logPrefix);
        action.goTo(nodeOutcomes.ERROR);
      }
    } catch (e) {
      logger.error("{} Error decoding Base64 string: {}", nodeConfig.logPrefix, e.message);
      action.goTo(nodeOutcomes.ERROR);
    }
  } else {
    logger.error("{} Malformed Basic Authorization header or is not Base64 encoded", nodeConfig.logPrefix);
    action.goTo(nodeOutcomes.NO_CREDENTIALS);
  }
} else {
  action.goTo(nodeOutcomes.NO_CREDENTIALS);
}