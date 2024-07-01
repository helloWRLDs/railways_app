
const errors = {
    INVALID_INPUT: {
        code: 409,
        message: "Unprocessable Entity",
        description: "Could process the provided data"
    },
    NOT_FOUND: {
        code: 404,
        message: "Not Found",
        description: "Resource not found"
    },
    INERNAL_ERROR: {
        code: 500,
        message: "Internal Server Error",
        description: "Something went wrong"
    }
}

module.exports = errors