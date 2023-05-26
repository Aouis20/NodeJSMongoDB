const express = require('express')
const router = express.Router()
const accountCtrl = require("../controllers/account.js")
const auth = require("../middleware/auth.js")

router.post("/", auth, accountCtrl.create)
router.put("/:id", auth, accountCtrl.update)
router.delete("/:id", auth, accountCtrl.delete)
router.get("/:id", auth, accountCtrl.get)
