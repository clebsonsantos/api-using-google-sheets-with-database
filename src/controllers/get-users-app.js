const { env } = require("../config/env");

class GetUsersApp {
  AuthenticatedSpreadSheet;
  getUsers;
  constructor({
      AuthenticatedSpreadSheet, 
      getUsers
  }){
    this.AuthenticatedSpreadSheet = AuthenticatedSpreadSheet
    this.getUsers = getUsers
  }

  async handle(request, response){
    
    try {
      const { sheetRange } = await this.AuthenticatedSpreadSheet(env.spreadSheetTabUsers)

      const values = await this.getUsers(sheetRange)
      return response.status(200).json(values)

    } catch (e) {

      return response.status(500).json({
        erro: e.message,
        message: "Internal Server Error"
      })
    }
  }
}


module.exports = {
  GetUsersApp
}