const { Router } = require("express")
const { CreateExpense } = require("../../controllers/create-expense")
const { ListExpense } = require("../../controllers/list-expenses")
const { AuthenticatedSpreadSheet, addRows, getValues } = require("../../gateways/spreadsheet")

const routes = Router()


routes.post("/expense/add", async (request, response)=> {
  const createExpenseController = new CreateExpense({ AuthenticatedSpreadSheet, addRows })
  await createExpenseController.handle(request, response)
})

routes.get("/expenses/list", async (request, response) => {
  const listExpenseController = new ListExpense({ AuthenticatedSpreadSheet, getValues })
  await listExpenseController.handle(request, response)
})

module.exports = { 
  routes
}