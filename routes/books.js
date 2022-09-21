const express = require('express')

const booksRoutes = express.Router()

const fsPromises = require('fs').promises
const path = require('path')

const booksDbPath = path.join(__dirname, '..', 'db', 'books.json')
const usersDbPath = path.join(__dirname, '..', 'db', 'users.json')

// ------------ Import the Authentication Middleware ----------
const { passwordAuthMiddleware, adminAuthMiddleware, visitorAuthMiddleware } = require('../middleware/books.middleware')

// ------------ Create Books route --------------
booksRoutes.post('/create', [passwordAuthMiddleware, adminAuthMiddleware], async (req, res) => {
    const newBook = req.body.book

    let allBooks = await fsPromises.readFile(booksDbPath)
    allBooks = JSON.parse(allBooks)

    let lastBookId = allBooks[allBooks.length - 1].id
    newBook.id = lastBookId + 1

    let updatedBooks = [...allBooks, newBook]

    updatedBooks = await fsPromises.writeFile(booksDbPath, JSON.stringify(updatedBooks))

    res.status(200).json(newBook)

})

// ------------ Delete Books Route ----------------
booksRoutes.delete('/delete', [passwordAuthMiddleware, adminAuthMiddleware], async (req, res) => {
    const bookId = req.body.book.id

    let allBooks = await fsPromises.readFile(booksDbPath)
    allBooks = JSON.parse(allBooks)

    const bookToDelete = allBooks.findIndex(book => book.id === bookId)

    if (bookToDelete === -1) {
        return res.status(400).send("Book not found")
    }

    allBooks.splice(bookToDelete, 1)
    fsPromises.writeFile(booksDbPath, JSON.stringify(allBooks))

    lastBookId = allBooks[allBooks.length - 1].id

    res.status(200).send("Book deleted successfully")
})

// ------------ Loan Books Route ----------------
booksRoutes.post('/loan', [passwordAuthMiddleware, visitorAuthMiddleware], async (req, res) => {
    const loanBook = req.body.book

    let allBooks = await fsPromises.readFile(booksDbPath)
    allBooks = JSON.parse(allBooks)

    const bookFound = allBooks.findIndex(book => book.title === loanBook.title)

    if (bookFound === -1) {
        res.status(404).send('The Book you want to loan is not available')
    }

    allBooks.splice(bookFound, 1)
    fsPromises.writeFile(booksDbPath, JSON.stringify(allBooks))

    res.status(200).json({ success: `${loanBook.title} loaned out successfully` })
})

// ------------ Return Books Route ----------------
booksRoutes.post('/return', [passwordAuthMiddleware, visitorAuthMiddleware], async (req, res) => {
    const bookReturned = req.body.book

    let allBooks = await fsPromises.readFile(booksDbPath)
    allBooks = JSON.parse(allBooks)

    const bookFound = allBooks.find(book => book.title === bookReturned.title)
 
    if (bookFound) {
        res.writeHead(500).send("You have already returned this book")
    } else {
        let lastBookId = allBooks[allBooks.length - 1].id
        bookReturned.id = lastBookId + 1

        let updateBooks = [...allBooks, bookReturned] 

        fsPromises.writeFile(booksDbPath, JSON.stringify(updateBooks))

        res.status(200).send("Book returned successfully")
    }

})

module.exports = booksRoutes;