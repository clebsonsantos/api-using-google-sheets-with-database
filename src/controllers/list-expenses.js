
class ListExpense {
  AuthenticatedSpreadSheet;
  getValues;
  constructor({
      AuthenticatedSpreadSheet, 
      getValues
  }){
    this.AuthenticatedSpreadSheet = AuthenticatedSpreadSheet
    this.getValues = getValues
  }

  async handle(request, response){
    
    try {
      const { sheetRange } = await this.AuthenticatedSpreadSheet()

      const values = await this.getValues(sheetRange)
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
  ListExpense
}