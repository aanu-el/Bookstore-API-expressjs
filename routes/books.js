const express = require('express')
const booksRoutes = express.Router()

// ------------ Import Controllers ------------------
const bookController = require("../controllers/bookController")


// ------------ Import the Authentication Middleware ----------
const { passwordAuthMiddleware, adminAuthMiddleware, visitorAuthMiddleware } = require('../middleware/auth.middleware')

// ------------ Routes --------------
booksRoutes.post('/create', [passwordAuthMiddleware, adminAuthMiddleware], bookController.createBook)

booksRoutes.delete('/delete', [passwordAuthMiddleware, adminAuthMiddleware], bookController.deleteBook)

booksRoutes.post('/loan', [passwordAuthMiddleware, visitorAuthMiddleware], bookController.loanBook)

booksRoutes.post('/return', [passwordAuthMiddleware, visitorAuthMiddleware], bookController.returnBook)

booksRoutes.put('/update/:id', [passwordAuthMiddleware, adminAuthMiddleware], bookController.updateBook)


module.exports = booksRoutes;