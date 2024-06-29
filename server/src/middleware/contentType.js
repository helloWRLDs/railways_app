const contentJson = async(req, res, next) => {
    res.set("Content-Type", "application/json")
    next()
}

module.exports = contentJson