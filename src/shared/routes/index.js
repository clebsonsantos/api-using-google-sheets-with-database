const { Router } = require("express")
const { CreateExpense } = require("../../controllers/create-expense")
const { DeleteExpense } = require("../../controllers/delete-expense")
const { GetUsersApp } = require("../../controllers/get-users-app")
const { ListExpense } = require("../../controllers/list-expenses")
const { UpdateExpense } = require("../../controllers/update-expense")
const { AuthenticatedSpreadSheet, addRows, getValues, deleteValue, updateRow, getUsers } = require("../../gateways/spreadsheet")
const { ensureAuthenticated } = require("../../middleware/auth")

const routes = Router()

routes.post("/expense/add", ensureAuthenticated, async (request, response)=> {
  const createExpenseController = new CreateExpense({ AuthenticatedSpreadSheet, addRows })
  await createExpenseController.handle(request, response)
})

routes.get("/expenses/list", ensureAuthenticated, async (request, response) => {
  const listExpenseController = new ListExpense({ AuthenticatedSpreadSheet, getValues })
  await listExpenseController.handle(request, response)
})

routes.delete("/expense/delete/:id", ensureAuthenticated, async (request, response) => {
  const deleteExpenseController = new DeleteExpense({ AuthenticatedSpreadSheet, deleteValue })
  await deleteExpenseController.handle(request, response)
})

routes.put("/expense/update/:id", ensureAuthenticated, async (request, response) => {
  const updateExpenseController = new UpdateExpense({ AuthenticatedSpreadSheet, updateRow  })
  await updateExpenseController.handle(request, response)
})

routes.get("/users/list", ensureAuthenticated, async (request, response) => {
  const usersController = new GetUsersApp({ AuthenticatedSpreadSheet, getUsers })
  await usersController.handle(request, response)
})

module.exports = { 
  routes
}