
class ListExpense {
  AuthenticatedSpreadSheet;
  getValues;
  constructor({
      AuthenticatedSpreadSheet, 
      getValues
  }){
    this.getValues = getValues
    this.AuthenticatedSpreadSheet = AuthenticatedSpreadSheet
  }

  async handle(request, response){
    
    try {
      const { sheetRange } = await this.AuthenticatedSpreadSheet()

      const values = await this.getValues(sheetRange)
      return response.status(200).json(values)

    } catch (e) {

      return response.status(400).json({
        erro: e.message
      })
    }
  }
}


module.exports = {
  ListExpense
}