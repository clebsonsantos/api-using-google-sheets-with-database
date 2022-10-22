const { Router } = require("express")
const { CreateExpense } = require("../../controllers/create-expense")
const { DeleteExpense } = require("../../controllers/delete-expense")
const { ListExpense } = require("../../controllers/list-expenses")
const { UpdateExpense } = require("../../controllers/update-expense")
const { AuthenticatedSpreadSheet, addRows, getValues, deleteValue, updateRow } = require("../../gateways/spreadsheet")

const routes = Router()

routes.post("/expense/add", async (request, response)=> {
  const createExpenseController = new CreateExpense({ AuthenticatedSpreadSheet, addRows })
  await createExpenseController.handle(request, response)
})

routes.get("/expenses/list", async (request, response) => {
  const listExpenseController = new ListExpense({ AuthenticatedSpreadSheet, getValues })
  await listExpenseController.handle(request, response)
})

routes.delete("/expense/delete/:id", async (request, response) => {
  const deleteExpenseController = new DeleteExpense({ AuthenticatedSpreadSheet, deleteValue })
  await deleteExpenseController.handle(request, response)
})

routes.put("/expense/update/:id", async (request, response) => {
  const updateExpenseController = new UpdateExpense({ AuthenticatedSpreadSheet, updateRow  })
  await updateExpenseController.handle(request, response)
})

module.exports = { 
  routes
}