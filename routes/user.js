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
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
router.get("/forget-password-form", userController.forgetPasswordForm);
router.post("/forget-password", userController.forgetPassword);
router.get("/reset-password/:token", userController.resetPasswordForm);
router.post("/reset-password/:token", userController.resetPassword);
router.get(
  "/add-image/:id",
  passport.checkAuthentication,
  userController.addImagePage
);
router.post(
  "/add-image/:id",
  passport.checkAuthentication,
  userController.addImage
);

module.exports = router;
