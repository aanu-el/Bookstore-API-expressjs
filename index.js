const http = require('http')
const fs = require('fs').promises

const server = http.createServer(requestHandler)

// import the request handlers for each route
const { createUser, authenticateUser, getAllUsers, createBook, deleteBook, loanBook, returnBook, updateBooks } = require('./required_files/requestHandler')

const { userAuth, bookAuth } = require('./required_files/authentication')

// Request Handler for the http server
function requestHandler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/createUser' && req.method === 'POST') {
        createUser(req, res)
    } else if (req.url === '/authenticateUser' && req.method === 'POST') {
        authenticateUser(req, res)
    } else if (req.url === '/getAllUsers' && req.method === 'GET') {
        userAuth(req, res, ['admin'])
            .then(() => {
                getAllUsers(req, res)
            })
            .catch((err) => {
                res.writeHead(401)
                res.end(JSON.stringify({
                    "message": err
                }))
                console.log(err)
            })
    } else if (req.url === '/createBook' && req.method === 'POST') {
        bookAuth(req, res, ['admin'])
            .then((book) => {
                createBook(req, res, book)
            })
            .catch((err) => {
                res.writeHead(401)
                res.end(JSON.stringify({
                    "message": err
                }))
                console.log(err)
            })
        
    } else if (req.url === '/deleteBook' && req.method === 'DELETE') {
        deleteBook(req, res)
    } else if (req.url === '/loanOut' && req.method === 'POST') {
        loanBook(req, res)
    } else if (req.url === '/returnBook' && req.method === 'POST') {
        returnBook(req, res) 
    } else if (req.url === '/updateBooks' && req.method === 'PUT') {
        updateBooks(req, res)
    }
    else {
        res.writeHead(404)
        res.end('404! Route not found')
    }
}

//  Server Configuration
const HOSTNAME = 'localhost'
const PORT = '4000'
server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`)
})