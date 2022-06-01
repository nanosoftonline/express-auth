const User = require("../../Models/User");
const { generateToken, hashPassword } = require("../../Core/auth")

async function registerUser(userData) {
    const { name, email, password } = userData

    const userExists = await User.findOne({ email })

    if (userExists) {
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password: await hashPassword(password),
    })

    if (user) {
        return {
            token: generateToken(user.id),
            id: user.id,
            email: user.email,
            name: user.name
        }
    } else {
        throw new Error('Invalid user data')
    }
}

module.exports = {
    registerUser
};