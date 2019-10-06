const express = require("express");
const router = express.Router();
const userController = require("./controller");
const {authenticate, authorzied} = require("../../../middlewares/auth")


router.get("/", authenticate, authorzied(["admin"]), userController.getUser)
router.post("/", userController.createUser)
router.put("/:id", userController.updateusesrbyid)
router.get("/:id", userController.getUserbyid)
router.delete("/:id", userController.deleteUser)
router.post("/login", userController.login)

module.exports = router;
// export default router
