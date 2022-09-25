const express = require('express')

const booksRoutes = express.Router()

const fsPromises = require('fs').promises
const path = require('path')

const booksDbPath = path.join(__dirname, '..', 'db', 'books.json')
const usersDbPath = path.join(__dirname, '..', 'db', 'users.json')

// ------------ Import Controllers ------------------
const bookController = require("../controllers/bookController")


// ------------ Import the Authentication Middleware ----------
const { passwordAuthMiddleware, adminAuthMiddleware, visitorAuthMiddleware } = require('../middleware/books.middleware')

// ------------ Routes --------------
booksRoutes.post('/create', [passwordAuthMiddleware, adminAuthMiddleware], bookController.createBook)

booksRoutes.delete('/delete', [passwordAuthMiddleware, adminAuthMiddleware], bookController.deleteBook)

booksRoutes.post('/loan', [passwordAuthMiddleware, visitorAuthMiddleware], bookController.loanBook)

booksRoutes.post('/return', [passwordAuthMiddleware, visitorAuthMiddleware], bookController.returnBook)

booksRoutes.put('/update/:id', [passwordAuthMiddleware, adminAuthMiddleware], bookController.updateBook)

module.exports = booksRoutes;