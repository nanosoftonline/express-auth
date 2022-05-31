const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const { getUsers } = require("../UseCases/User/GetUsers");
const { registerUser } = require("../UseCases/User/RegisterUser");

router.get("/", asyncHandler(async (req, res) => {
    const users = await getUsers();
    res.status(200).send(users);
}));

router.post("/register", asyncHandler(async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(200).send(user);
    } catch (e) {
        res.status(400)
        throw e
    }

}));

module.exports = router;
