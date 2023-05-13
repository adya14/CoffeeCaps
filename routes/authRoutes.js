const{ Router } = require('express');
const authController = require('../controllers/authController');
const router = Router();
const express = require('express')
const passport = require('passport')


router.get('/signup' , authController.signup_get);
router.post('/signup' , authController.signup_post);
router.get('/login' , authController.login_get);
router.post('/login' , authController.login_post);
router.get('/logout' , authController.logout_get);

module.exports = router;

//OAuth

router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000");
  });

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;