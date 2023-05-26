const express = require('express')
const router = express.Router()
const operationCtrl = require("../controllers/operation.js")
const auth = require("../middleware/auth.js")

router.post("/", auth, operationCtrl.create)
router.put("/:id", auth, operationCtrl.update)
router.delete("/:id", auth, operationCtrl.delete)
router.get("/:id", auth, operationCtrl.get)
