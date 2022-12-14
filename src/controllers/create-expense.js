
class CreateExpense {
  AuthenticatedSpreadSheet 
  addRows
  constructor({
    AuthenticatedSpreadSheet, 
    addRows
  }){
    this.AuthenticatedSpreadSheet = AuthenticatedSpreadSheet
    this.addRows = addRows
  }

  async handle(request, response){
    
    try {
      const { sheetRange } = await this.AuthenticatedSpreadSheet()
      const { nome, valor, tipo, categoria, data } = request.body

      const value = await this.addRows(sheetRange, {
        NOME: nome,
        VALOR: valor,
        TIPO: tipo,
        CATEGORIA: categoria ,
        DATA: data
      })

      return response.status(200).json({
        id: value._rawData[0],
        nome,
        valor,
        tipo,
        categoria,
        data
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
  CreateExpense
}