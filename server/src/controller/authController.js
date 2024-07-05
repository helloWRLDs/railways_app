const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getUserByEmail, getUserByUsername, updateUser, isUserExistByUsername, isUserExistByEmail, getUserById } = require("../repository/userRepository")
const errors = require("../types/errors")
const generateVerificationCode = require('../util/codeGenerate')
const { createVerificationCode, getUserIdByCode, deleteVerificationCode } = require('../repository/authRepository')
const notify = require('../util/emailNotifier')

const loginUserController = async(req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        res.status(errors.INVALID_INPUT.code).json(errors.INVALID_INPUT)
        return
    }
    const user = await getUserByEmail(email);
    if (!user) {
        res.status(errors.NOT_FOUND.code).json(errors.NOT_FOUND)
        return
    }
    if (!(await bcrypt.compare(String(password), user.password))) {
        res.status(errors.UNAUTHORIZED.code).json(errors.UNAUTHORIZED)
        return
    }
    const token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '1h'})
    res.status(200).json({token: token, id: user.id})
}

const registerUserController = async(req, res) => {
    res.status(200).json("Login Controller")
}

const authenticateTelegramUserController = async(req, res) => {
    const username = req.body.username
    if (!username) {
        res.status(errors.INVALID_INPUT.code).json(errors.INVALID_INPUT)
        return
    }
    const user = await getUserByUsername(username)
    if (!user) {
        res.status(errors.NOT_FOUND.code).json(errors.NOT_FOUND)
        return
    }
    res.status(200).json({user: user})
}

const telegramToEmailController = async(req, res) => {
    const email = req.body.email
    if (!email) {
        res.status(errors.INVALID_INPUT.code).json(errors.INVALID_INPUT)
        return
    }
    const user = await getUserByEmail(email)
    if (!user) {
        res.status(errors.NOT_FOUND.code).json(errors.NOT_FOUND)
        return
    }
    const code = generateVerificationCode()
    console.log(code)
    const id = await createVerificationCode(user.id, code)
    if (!id) {
        res.status(errors.INTERNAL_ERROR.code).json(errors.INTERNAL_ERROR)
        return
    }
    try {
        notify(user.email, code)
        res.status(200).json({code: 200, message: "Verification code sent to email", id: id})
    } catch(e) {
        res.status(errors.NOT_FOUND.code).json(errors.NOT_FOUND)
        return
    }
}

const verifyTelegramUserController = async(req, res) => {
    const code = req.params.code
    const username = req.body.username
    if (!username || !code) {
        res.status(errors.INVALID_INPUT.code).json(errors.INVALID_INPUT)
        return
    }
    const user_id = await getUserIdByCode(code)
    if (!user_id) {
        res.status(errors.NOT_FOUND.code).json(errors.NOT_FOUND)
        return
    }
    const code_id = await deleteVerificationCode(code)
    if (!code_id) {
        res.status(errors.INTERNAL_ERROR.code).json(errors.INTERNAL_ERROR)
        return
    }
    const user = await getUserById(user_id)
    user.username = username
    const id = await updateUser(user_id, user)
    if (!id) {
        res.status(errors.INTERNAL_ERROR.code).json(errors.INTERNAL_ERROR)
        return
    }
    res.status(200).json({code: 200, message: "Telegram user mapped to email", id: id})
}

module.exports = {
    loginUserController,
    registerUserController,
    authenticateTelegramUserController,
    telegramToEmailController,
    verifyTelegramUserController
}
