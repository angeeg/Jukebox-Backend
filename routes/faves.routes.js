const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

router.get("/", ctrls.Faves.index);
router.post("/", ctrls.Faves.create);
router.delete("/:id", ctrls.Faves.destroy);
router.put("/:id", ctrls.Faves.update);

module.exports = router;
