const fsPromises = require('fs').promises
const path = require('path')

const usersDbPath = path.join(__dirname, '..', 'db', 'users.json')
const redirect_page = path.join(__dirname, '..', 'public', '404.html')

async function passwordAuthMiddleware(req, res, next) {
    const role = ['admin']

    const loginDetails = req.body.user

    if (!loginDetails) {
        return res.status(403).json({ error: "No credentials sent" })
    }

    let allUsers = await fsPromises.readFile(usersDbPath)
    allUsers = JSON.parse(allUsers)

    const userFound = allUsers.find(user => user.username === loginDetails.username && user.password === loginDetails.password)

    if (!userFound) {
        return res.status(403).json({ error: "Invalid Username or Password" })
    }

    next()
}

async function adminAuthMiddleware(req, res, next) {
    const role = ["admin"]

    const loginDetails = req.body.user

    if (!loginDetails) {
        return res.status(403).json({ error: "No credentials sent" })
    }

    let allUsers = await fsPromises.readFile(usersDbPath)
    allUsers = JSON.parse(allUsers)

    const userFound = allUsers.find(user => user.username === loginDetails.username && user.password === loginDetails.password)

    if (!userFound) {
        return res.status(403).json({ error: "Invalid Username or Password" })
    }

    if (!role.includes(userFound.role)) {
        return res.status(403).json({ error: "You do not have required access to perform this operation" })
    }

    next()
}

async function visitorAuthMiddleware(req, res, next) {
    const role = ["visitor"]

    const loginDetails = req.body.user

    if (!loginDetails) {
        return res.status(403).json({ error: "No credentials sent" })
    }

    let allUsers = await fsPromises.readFile(usersDbPath)
    allUsers = JSON.parse(allUsers)

    const userFound = allUsers.find(user => user.username === loginDetails.username && user.password === loginDetails.password)

    if (!userFound) {
        return res.status(403).json({ error: "Invalid Username or Password" })
    }

    if (!role.includes(userFound.role)) {
        return res.status(403).json({ error: "You do not have required access to perform this operation" })
    }

    next()
}

module.exports = { passwordAuthMiddleware, adminAuthMiddleware, visitorAuthMiddleware } 