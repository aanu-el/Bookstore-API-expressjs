const express = require('express')

const booksRoutes = express.Router()
const createBook = require('../required_files/requestHandler')

const fsPromises = require('fs').promises
const path = require('path')

const booksDbPath = path.join(__dirname, '..', 'db', 'books.json')
const usersDbPath = path.join(__dirname, '..', 'db', 'users.json')


booksRoutes.use(async (req, res, next) => {
    const loginDetails = req.body.user
    const role = ['admin']

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
})

booksRoutes.post('/createBook', async (req, res) => {
    const newBook = req.body.book

    let allBooks = await fsPromises.readFile(booksDbPath)
    allBooks = JSON.parse(allBooks)

    let lastBookId = allBooks[allBooks.length - 1].id
    newBook.id = lastBookId + 1

    let updatedBooks = [...allBooks, newBook]

    updatedBooks = await fsPromises.writeFile(booksDbPath, JSON.stringify(updatedBooks))

    res.status(200).json(newBook)

})

booksRoutes.delete('/deleteBook', async (req, res) => {
    const bookId = req.body.book

    let allBooks = await fsPromises.readFile(booksDbPath)
    allBooks = JSON.parse(allBooks)

    const bookToDelete = allBooks.findIndex(book => book.id === bookId)

    allBooks.splice(bookToDelete, 1)

    updatedBooks = await fsPromises.writeFile(booksDbPath, JSON.stringify(allBooks))

    res.status(200).send("Book deleted successfully")
})


module.exports = booksRoutes;