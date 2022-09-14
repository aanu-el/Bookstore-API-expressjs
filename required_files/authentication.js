const fs = require('fs')
const path = require('path')

const usersDbPath = path.join(__dirname, '..', 'db', 'users.json')

function authentication(req, res, role) {
    const body = []

    req.on('data', (chunk) => {
        body.push(chunk)
    })

    req.on('end', async () => {
        const parsedBody = Buffer.concat(body).toString()

        if (!parsedBody) {
            res.writeHead(400)
            console.log(err)
            res.end('Username and Password not Provided')
        }

        let userDetails = JSON.parse(parsedBody)

        const allRegisteredUsers = await getRegisteredUsers()

        
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

module.exports = authentication