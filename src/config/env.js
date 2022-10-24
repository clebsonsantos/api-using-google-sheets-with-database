const env = {
  spreadSheetId: process.env.SPREADSHEET_ID || "",
  port: process.env.PORT || "",
  spreadSheetNameTab: process.env.SPREAD_SHEET_NAME_TAB  || "",
  authToken: process.env.AUTH_TOKEN || "",
  spreadSheetTabUsers: process.env.SPREAD_SHEET_TAB_USERS || ""
}

module.exports = {
  env
}