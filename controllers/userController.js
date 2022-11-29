const fsPromises = require('fs').promises
const path = require('path')
const { nextTick } = require('process')

const usersDbPath = path.join(__dirname, '..', 'db', 'users.json')



async function createUser(req, res, next) {
    try {
        const newUser = req.body

        const allUsers = await fsPromises.readFile(usersDbPath)
        allUsers = JSON.parse(allUsers)

        let lastUserId = allUsers[allUsers.length - 1].id
        newUser.id = lastUserId + 1

        let updatedUser = [...allUsers, newUser]
        fsPromises.writeFile(usersDbPath, JSON.stringify(updatedUser))
    } catch (error) {
        error.type = "Bad Request"
        next(error)
    }
}

async function login(req, res, next) {
    try {
        const loginDetails = req.body

        const allUsers = await fsPromises.readFile(usersDbPath)
        allUsers = JSON.parse(allUsers)

        let userFound = allUsers.find(user => user.username === loginDetails.username && user.password === loginDetails.password)

        if (!userFound) {
            res.status(404).send('User not found. Please register')
        }

        res.status(200).send(`Welcome ${loginDetails.username}`)
    } catch (error) {
        error.type = "redirect"
        next(error)
    }
}

async function getAllUsers(req, res, next) {
    try {
        let allUsers = await fsPromises.readFile(usersDbPath)
        allUsers = JSON.parse(allUsers)

        res.status(200).send(allUsers)

    } catch (error) {
        error.type = "redirect"
        next(error)
    }

}


module.exports = {
    createUser,
    login,
    getAllUsers
}