const { GoogleSpreadsheet } = require("google-spreadsheet");
const path = require("path")
const crypto = require("crypto")
const fs = require("fs/promises")

const { env } = require("../config/env");


async function AuthenticatedSpreadSheet(spreadSheetNameTab = env.spreadSheetNameTab) {
  try {
    const doc = new GoogleSpreadsheet(env.spreadSheetId);
    const readFile = path.join(process.cwd(), "crendentials-google.json")
    const credentials = JSON.parse(await fs.readFile(readFile))
  
    await doc.useServiceAccountAuth(credentials);
  
    await doc.loadInfo();
    const sheetRange =  doc.sheetsByTitle[spreadSheetNameTab]

    return {
      sheetRange
    }
  } catch (e) {
    console.log(e.message)
  }
}


async function addRows(sheetRange, {
    NOME,
    VALOR,
    TIPO,
    CATEGORIA ,
    DATA
}){
  const rows = await sheetRange.addRow({
    ID: crypto.randomUUID(),
    NOME,
    VALOR,
    TIPO,
    CATEGORIA,
    DATA: !DATA ? new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString() : DATA,
  })
  return rows
}


async function getValues(sheetRange){

  const values = await sheetRange.getRows()

  const result = new Array()

  values.forEach((item) => {
      result.push({
        id: item.ID,
        nome: item.NOME,
        valor: item.VALOR,
        tipo: item.TIPO,
        categoria: item.CATEGORIA,
        data: item.DATA
      })
  })

  return result
}

async function getUsers(sheetRange) {
  const values = await sheetRange.getRows()

  const result = new Array()

  values.forEach((item) => {
      result.push({
        id: crypto.randomUUID(),
        nome: item.NOME,
        email: item.EMAIL
      })
  })

  return result
}

async function deleteValue(sheetRange, id){

  const values = await sheetRange.getRows()

  let ok = false
  values.forEach((row) => {
    if (row.ID === id) {
      row.delete()
      ok = true
    }
  })
  return ok
}

async function updateRow(sheetRange, {
  ID,
  NOME,
  VALOR,
  TIPO,
  CATEGORIA ,
  DATA
}){
  const row = await sheetRange.getRows()
  let existRow;
  row.forEach((item)=> {
    if (item.ID === ID) {
      existRow = item
    }
  })

  if (!existRow) {
    return false
  }
  const expense = existRow

  expense.NOME = NOME ? NOME : expense.NOME
  expense.VALOR = VALOR ? VALOR : expense.VALOR
  expense.TIPO = TIPO ? TIPO : expense.TIPO
  expense.CATEGORIA = CATEGORIA ? CATEGORIA : expense.CATEGORIA
  expense.DATA = DATA ? DATA : expense.DATA

  expense.save()

  return expense
}

module.exports = { AuthenticatedSpreadSheet, addRows, getValues, deleteValue, updateRow, getUsers }