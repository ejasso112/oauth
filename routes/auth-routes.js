const router = require("express").Router()
const passport = require("passport")
// auth Login
router.get("/login", (req, res) => {
    res.render("login");
})

// auth logout
router.get("/logout", (req, res) => {
    //handle with passport
    res.send("logging out")
})

// auth with google
router.get("/google", passport.authenticate("google", {
    scope: ['profile']
}))

// callback route for google to redirect to
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.send("you reached the callback URI")
})

/*
// auth with anilist
router.get("/anilist", passport.authenticate("anilist"))

// callback route for anilist to redirect to
router.get("/anilist/callback", passport.authenticate("anilist"), (req, res) => {
    res.send("you reached the callback URI")
})*/

module.exports = router
