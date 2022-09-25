const express = require('express')
const bodyParser = require('body-parser')

// const http = require('http')
// const fs = require('fs').promises

const app = express()

// --------------- Importing Routes ---------------------
const booksRoutes = require('./routes/books')
// const usersRoute = require('./routes/users')

// --------------- Third Party Middleware ---------------
app.use(express.static('public'))
app.use(bodyParser.json())

// ---------------- Template engine ---------------------
app.set('view engine', 'ejs')
app.set('views', 'views')

// ---------------- Use API Routes ------------------------
app.use('/books', booksRoutes)
// app.use('/users', usersRoute)

// ---------------- Get All Routes ----------------------
app.get('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
})

// Request Handler for the http server
// function requestHandler(req, res) {
//     res.setHeader('Content-Type', 'application/json');

//     if (req.url === '/createUser' && req.method === 'POST') {
//         createUser(req, res)
//     } else if (req.url === '/authenticateUser' && req.method === 'POST') {
//         authenticateUser(req, res)
//     } else if (req.url === '/getAllUsers' && req.method === 'GET') {
//         userAuth(req, res, ['admin'])
//             .then(() => {
//                 getAllUsers(req, res)
//             })
//             .catch((err) => {
//                 res.writeHead(401)
//                 res.end(JSON.stringify({
//                     "message": err
//                 }))
//                 console.log(err)
//             })
//     } else if (req.url === '/createBook' && req.method === 'POST') {
//         bookAuth(req, res, ['admin'])
//             .then((book) => {
//                 createBook(req, res, book)
//             })
//             .catch((err) => {
//                 res.writeHead(401)
//                 res.end(JSON.stringify({
//                     "message": err
//                 }))
//                 console.log(err)
//             })

//     } else if (req.url === '/deleteBook' && req.method === 'DELETE') {
//         bookAuth(req, res, ['admin'])
//             .then((book) => {
//                 deleteBook(req, res, book)
//             }).catch((err) => {
//                 res.writeHead(401)
//                 res.end(JSON.stringify({
//                     "message": err
//                 }))
//                 console.log(err)
//             })

//     } else if (req.url === '/loanOut' && req.method === 'POST') {
//         bookAuth(req, res, ['visitor'])
//             .then((book) => {
//                 loanBook(req, res, book)
//             }).catch((err) => {
//                 res.writeHead(400)
//                 res.end(JSON.stringify({
//                     "message": err
//                 }))
//                 console.log(err)
//             })

//     } else if (req.url === '/returnBook' && req.method === 'POST') {
//         bookAuth(req, res, ['visitor'])
//             .then((book) => {
//                 res.writeHead(200)
//                 returnBook(req, res, book)
//             })
//             .catch((err) => {
//                 res.writeHead(400)
//                 res.end(JSON.stringify({
//                     "message": err
//                 }))
//                 console.log(err)
//             })

//     } else if (req.url === '/updateBooks' && req.method === 'PUT') {
//         bookAuth(req, res, ['admin'])
//             .then((book) => {
//                 updateBooks(req, res, book)
//             })
//             .catch((err) => {
//                 res.writeHead(400)
//                 res.end(JSON.stringify({
//                     "message": err
//                 }))
//                 console.log(err)
//             })

//     }
//     else {
//         res.writeHead(404)
//         res.end('404! Route not found')
//     }
// }


//  Server Configuration
const PORT = '4000'
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})