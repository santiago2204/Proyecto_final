const express = require("express");
const UserController = require("../contollers/user");

const api = express.Router();

api.post("/signup", UserController.signUp);

module.exports = api;