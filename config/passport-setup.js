const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const keys = require("./keys")

passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: "/auth/google/callback",
        clientID: keys.google.clientId,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log("passprot callback function fired")
        console.log(profile)
    })
)