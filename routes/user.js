const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controller/user-controller");

console.log("create session");

router.get("/sign-up", userController.signUp);
router.post("/create", userController.createUser);
router.get("/sign-in", userController.signIn);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);
router.get("/sign-out", userController.destroySession);
router.get("/follow_user/:id", userController.followUser);
module.exports = router;
