const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");

const authController = require("../controllers/auth");

router.use(csrf());

router.get("/signin", authController.renderSignin);
router.get("/signup", authController.renderSignup);
router.get("/forgotpassword", authController.renderForgotPassword);
router.get("/verify", authController.renderVerify);

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    failureRedirect: "/auth/signup",
    failureFlash: true,
  }),
  authController.postSignup
);

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    failureRedirect: "/auth/signin",
    failureFlash: true,
  }),
  authController.postSignin
);

module.exports = router;
