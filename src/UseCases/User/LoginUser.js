const User = require("../../Models/User");
const { passwordValid, generateToken } = require("../../Core/auth")

async function loginUser(userData) {
    const { email, password } = userData

    const user = await User.findOne({ email })
    const authedUser = await passwordValid({ password, hashedPassword: user.password })

    if (user && (authedUser)) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        }
    } else {
        throw new Error('Invalid credentials')
    }
}

module.exports = {
    loginUser
}