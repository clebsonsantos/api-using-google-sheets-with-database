
class CreateExpense {
  spreadSheet;
  constructor(
    spreadSheet
  ){
    this.spreadSheet = spreadSheet
  }

  async handle(request, response){
    
    try {
      const { AuthenticatedSpreadSheet, addRows } = this.spreadSheet
      const { sheetRange } = await AuthenticatedSpreadSheet()
      const { nome, valor, tipo, categoria, data } = request.body

      const value = await addRows(sheetRange, {
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
      return response.status(400).json({
        erro: e.message
      })
    }
  }
}

module.exports = {
  CreateExpense
}