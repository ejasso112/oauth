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


// callback routh for googe to redirect to
router.get("/google/callback", (req, res) => {
    res.send("you reached the callback URI")
})
module.exports = router
