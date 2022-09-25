const fsPromises = require('fs').promises
const path = require('path')

const booksDbPath = path.join(__dirname, '..', 'db', 'books.json')


async function createBook(req, res) {
    const newBook = req.body.book

    let allBooks = await fsPromises.readFile(booksDbPath)
    allBooks = JSON.parse(allBooks)

    let lastBookId = allBooks[allBooks.length - 1].id
    newBook.id = lastBookId + 1

    let updatedBooks = [...allBooks, newBook]

    updatedBooks = await fsPromises.writeFile(booksDbPath, JSON.stringify(updatedBooks))

    res.status(201).json(newBook)
}

async function deleteBook(req, res) {
    const bookId = req.params.id

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
}

async function loanBook(req, res) {
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
}

async function returnBook(req, res) {
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
}

async function updateBook(req, res) {
    const bookId = req.params.id
    const bookInfo = req.body.book

    let allBooks = await fsPromises.readFile(booksDbPath)
    allBooks = JSON.parse(allBooks)

    const bookIndex = allBooks.findIndex(book => book.id === parseInt(bookId))

    if (bookIndex === -1) {
        return res.status(400).send("Book not found")
    }

    allBooks[bookIndex] = { ...allBooks[bookIndex], ...bookInfo }

    fsPromises.writeFile(booksDbPath, JSON.stringify(allBooks))
    res.status(200).send("Book updated successfully")
}

module.exports = {
    createBook,
    deleteBook,
    loanBook,
    returnBook,
    updateBook
}