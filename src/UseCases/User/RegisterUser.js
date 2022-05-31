const User = require("../../Models/User");
const Joi = require("joi");
const { generateToken, hashPassword } = require("../../Core/auth")

async function registerUser(userData) {
    const { name, email, password } = userData

    const schema = Joi.object({
        email: Joi.string()
            .email({}),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    });

    const { error, value } = schema.validate(userData);

    if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        throw new Error('User already exists')
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password: await hashPassword(password),
    })

    if (user) {
        return {
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),

        }
    } else {
        throw new Error('Invalid user data')
    }
}

module.exports = {
    registerUser
};