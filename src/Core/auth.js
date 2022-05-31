const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

async function hashPassword(password) {
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword;

}

module.exports = {
    generateToken,
    hashPassword
}