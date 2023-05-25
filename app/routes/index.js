const express = require('express')
const router = express();

const userRoutes = require('./user.js')
const accountRoutes = require('./account.js')
const operationRoutes = require('./operation.js')

router.use("/auth", userRoutes)
router.use("/account", accountRoutes)
router.use("/operation", operationRoutes)

module.exports = router