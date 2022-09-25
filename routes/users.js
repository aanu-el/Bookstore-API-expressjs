const express = require("express")
const UserRouter = express.Router()

// ------------ Import Controllers --------------------
const userController = require("../controllers/userController")

// ------------ Import the Authentication Middleware ----------
const { passwordAuthMiddleware, adminAuthMiddleware, visitorAuthMiddleware } = require('../middleware/auth.middleware')

UserRouter.post('/create', userController.createUser)
UserRouter.post('/login', userController.login)
UserRouter.get('/allUsers', [passwordAuthMiddleware, adminAuthMiddleware], userController.getAllUsers)

module.exports = UserRouter