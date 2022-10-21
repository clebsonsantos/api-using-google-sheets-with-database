const { GoogleSpreadsheet } = require("google-spreadsheet");
const path = require("path")
const crypto = require("crypto")
const fs = require("fs/promises")

const env = require("../config/env");


async function AuthenticatedSpreadSheet() {
  try {
    const doc = new GoogleSpreadsheet(env.spreadSheetId);
    const readFile = path.join(process.cwd(), "crendentials-google.json")
    const credentials = JSON.parse(await fs.readFile(readFile))
  
    await doc.useServiceAccountAuth(credentials);
  
    await doc.loadInfo(); // loads document properties and worksheets
    const sheetRange =  doc.sheetsByIndex[1]

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
    DATA: !DATA ? new Date().toLocaleDateString() + " às " + new Date().toLocaleTimeString() : DATA,
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


async function deleteValue(sheetRange, id){

  const values = await sheetRange.getRows()

  let ok = false
  values.forEach((row) => {
    if (row.ID === id) {
      row.delete()
      console.log(row)
      ok = true
    }
  })
  return ok
}


module.exports = { AuthenticatedSpreadSheet, addRows, getValues, deleteValue }