const express = require("express");
const router = express.Router();
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({ passError: true })
const asyncHandler = require("express-async-handler");
const { getUsers } = require("../UseCases/User/GetUsers");
const { registerUser } = require("../UseCases/User/RegisterUser");
const { loginUser } = require("../UseCases/User/LoginUser");

router.get("/", asyncHandler(async (req, res) => {
    const users = await getUsers();
    res.status(200).send(users);
}));

router.post("/register",
    validator.body(Joi.object({
        email: Joi.string()
            .email({}),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    })), asyncHandler(async (req, res) => {
        try {
            const user = await registerUser(req.body);
            res.status(200).send(user);
        } catch (e) {
            res.status(400)
            throw e
        }

    })
);


router.post("/login",
    validator.body(Joi.object({
        email: Joi.string()
            .email({}),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })), asyncHandler(async (req, res) => {
        try {
            const result = await loginUser(req.body);
            res.status(200).send(result);
        } catch (e) {
            res.status(400)
            throw e
        }

    })
);

//Shape Joi errors in response
router.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        return res.status(400).json({
            type: err.type, // "query","headers","body" or "params"
            message: err.error.toString()
        });
    }

    next(err);

})
module.exports = router;
