const express = require('express')

const booksRoutes = express.Router()
const createBook = require('../required_files/requestHandler')

const fsPromises = require('fs').promises
const path = require('path')

const booksDbPath = path.join(__dirname, '..', 'db', 'books.json')


booksRoutes.post('/createBook', async (req, res) => {
    const newBook = req.body

    let allBooks = await fsPromises.readFile(booksDbPath)

    allBooks = JSON.parse(allBooks)

    let lastBookId = allBooks[allBooks.length - 1].id
    newBook.id = lastBookId + 1

    let updatedBooks = [...allBooks, newBook]

    updatedBooks = await fsPromises.writeFile(booksDbPath, JSON.stringify(updatedBooks))

    res.status(200).json(newBook)

})


module.exports = booksRoutes;