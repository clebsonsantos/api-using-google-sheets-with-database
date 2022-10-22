const { env } = require("../config/env")
 
async function ensureAuthenticated(
  request,
  response,
  next
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(400).json({
      message: "Token obrigatório"
    })
  }

  try {
    
    if (authorization !== env.authToken ){
      return response.status(400).json({
        message: "Token inválido"
      })
    }
    next();
  } catch {
    return response.status(500).json({
      message: "Internal Server Error"
    })
  }
}

module.exports = {
  ensureAuthenticated
}