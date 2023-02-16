const express = require("express");
const router = express.Router();

const getEmployees = require("./controller");

router.get("/employees", getEmployees);

module.exports = router;
