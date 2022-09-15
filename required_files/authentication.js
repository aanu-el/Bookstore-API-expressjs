const fs = require('fs')
const path = require('path')

const usersDbPath = path.join(__dirname, '..', 'db', 'users.json')

function userAuthentication(req, res, roles) {
    return new Promise((resolve, reject) => {
        const body = []

        req.on('data', (chunk) => {
            body.push(chunk)
        })

        req.on('end', async () => {
            const parsedBody = Buffer.concat(body).toString()

            if (!parsedBody) {
                reject('Username and Password not found')
            }

            let userDetails = JSON.parse(parsedBody)

            const allRegisteredUsers = await getRegisteredUsers()

            let userFound = allRegisteredUsers.find(user => user.username === userDetails.username && user.password === userDetails.password)

            if (!userFound) {
                reject('Invalid User! Please register')
            }

            if (!roles.includes(userFound.role)) {
                reject('You do not have required access to get all users details')
            }

            resolve()
        })
    })
}

function getRegisteredUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile(usersDbPath, 'utf8', (err, users) => {
            if (err) {
                reject(err)
            }

            resolve(JSON.parse(users))
        })
    })
}

module.exports = { userAuthentication }