const jwt = require('jsonwebtoken')
const errors = require("../types/errors")
const { Role } = require('@prisma/client')

const authenticate = async(req, res, next) => {
    const token = req.headers.authorization
    const err = errors.UNAUTHORIZED
    if (!token) {
        err.description = "missing token"
        res.status(err.code).json(err)
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.id = decoded.id
        req.role = decoded.role
        next()
    } catch(e) {
        err.description = "bad payload or token expired"
        res.status(err.code).json(err)
    }
}

const authenticateAdmin = async(req, res, next) => {
    if (req.role != Role.ADMIN) {
        const err = errors.UNAUTHORIZED
        err.description = "insufficient permissions"
        res.status(err.code).json(err)
        return
    } else {
        next()
    }
}

module.exports = {
    authenticate,
    authenticateAdmin
}