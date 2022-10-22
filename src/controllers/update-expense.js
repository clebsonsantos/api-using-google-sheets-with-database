
class UpdateExpense {
  AuthenticatedSpreadSheet 
  updateRow
  constructor({
    AuthenticatedSpreadSheet, 
    updateRow
  }){
    this.AuthenticatedSpreadSheet = AuthenticatedSpreadSheet
    this.updateRow = updateRow
  }

  async handle(request, response){
    
    try {
      const {id } = request.params
      const { nome, valor, tipo, categoria, data } = request.body
      
      const { sheetRange } = await this.AuthenticatedSpreadSheet()
      const value = await this.updateRow(sheetRange, {
        ID: id,
        NOME: nome,
        VALOR: valor,
        TIPO: tipo,
        CATEGORIA: categoria ,
        DATA: data
      })

      if (value) {
        return response.status(200).json({
          id: value.ID,
          nome: value.NOME,
          valor: value.VALOR,
          tipo: value.TIPO,
          categoria: value.CATEGORIA,
          data: value.DATA
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
  UpdateExpense
}