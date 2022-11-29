
function errorHandler(error, req, res, next) {
    if (error.type === 'redirect') {
        res.status(404).send('404.html')
    } else if (error.type === "Bad Request") { 
        res.status(500).send("Bad Request")
    } else {
        res.status(500).send(error)
    }

    next()
}

module.exports = errorHandler