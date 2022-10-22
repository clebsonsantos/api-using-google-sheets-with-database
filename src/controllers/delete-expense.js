
class DeleteExpense {
  AuthenticatedSpreadSheet;
  deleteValue;
  constructor({
      AuthenticatedSpreadSheet, 
      deleteValue
  }){
    this.AuthenticatedSpreadSheet = AuthenticatedSpreadSheet
    this.deleteValue = deleteValue
  }

  async handle(request, response){
    
    try {
      const { sheetRange } = await this.AuthenticatedSpreadSheet()
      const { id } = request.params

      const result = await this.deleteValue(sheetRange, id)
      
      if (result) {
        return response.status(200).json({
          message: "Registro deletado!"
        })
      }
      return response.status(400).json({
        message: "Registro não existe!"
      })
    } catch (e) {

      return response.status(500).json({
        erro: e.message,
        message: "Internal Server Error"
      })
    }
  }
}


module.exports = {
  DeleteExpense
}