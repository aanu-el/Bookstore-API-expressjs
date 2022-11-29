const express = require("express")
const UserRouter = express.Router()

// ------------ Import Controllers --------------------
const userController = require("../controllers/userController")

// ------------ Import the Authentication Middleware ----------
const { passwordAuthMiddleware, adminAuthMiddleware, visitorAuthMiddleware } = require('../middleware/auth.middleware')
const errorHandler = require("../middleware/errors.middleware")

UserRouter.post('/create', userController.createUser, errorHandler)
UserRouter.post('/login', userController.login, errorHandler)
UserRouter.get('/allUsers', [passwordAuthMiddleware, adminAuthMiddleware], userController.getAllUsers, errorHandler)

module.exports = UserRouter