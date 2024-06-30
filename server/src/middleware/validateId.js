const { isUserExistById } = require("../repository/user")
const errors = require("../types/errors")

const validateId = async(req, res, next) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id) || id < 0) {
        res.status(errors.INVALID_INPUT.code).json(errors.INVALID_INPUT)
        return
    }
    if (!await isUserExistById(id)) {
        res.status(errors.NOT_FOUND.code).json(errors.NOT_FOUND)
        return
    }
    next()
}

module.exports = validateId