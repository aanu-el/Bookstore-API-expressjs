const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// --------------- Importing Routes ---------------------
const booksRoutes = require('./routes/books')
const usersRoute = require('./routes/users')

// --------------- Third Party Middleware ---------------
app.use(express.static('public'))
app.use(bodyParser.json())

// ---------------- Template engine ---------------------
app.set('view engine', 'ejs')
app.set('views', 'views')

// ---------------- Use API Routes ------------------------
app.use('/books', booksRoutes)
app.use('/users', usersRoute)

// ---------------- Get All Routes ----------------------
app.get("/", (req, res) => {
    res.status(200).send('Welcome to Home Page')
})

// app.get('*', (req, res) => {
//     res.status(404)
//     res.send('404 Not Found')
// })

//  Server Configuration
const PORT = '4000'
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})