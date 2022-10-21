module.exports = {
  spreadSheetId: process.env.SPREADSHEET_ID || "",
  port: process.env.PORT || "",
  rangerPosition: process.env.RANGER_POSITION  ? Number(process.env.RANGER_POSITION) : 0
}