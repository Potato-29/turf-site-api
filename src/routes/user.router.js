const express = require("express");
const router = express.Router();
const {
  GetAll,
  GetById,
  Create,
  Update,
  Delete,
  LoginUser,
  RegisterUser,
} = require("../controllers/user.controller");

router.get("/", GetAll);
router.get("/:id", GetById);
router.post("/login", LoginUser);
router.post("/signup", RegisterUser);
router.post("/", Create);
router.put("/:id", Update);
router.delete("/:id", Delete);

module.exports = router;
