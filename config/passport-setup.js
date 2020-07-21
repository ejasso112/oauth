const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const AniListStrategy = require("passport-anilist/lib").Strategy
const keys = require("./keys")
const User = require("../models/user-model")
const { localsName } = require("ejs")

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user.id)
    })
})

passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: "/auth/google/callback",
        clientID: keys.google.clientId,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        // check if user already exists in our db
        User.findOne({googleID: profile.id}).then((currentUser) => {
            if(currentUser) {
                // already have the user
                console.log(`User Is: ${currentUser}`)
                done(null, currentUser)
            } else {
                /// if not, create user in our db
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log(`New Use Created : ${newUser}`)
                    done(null, newUser)
                })
            }
        })
    })
)
/*
passport.use(
    new AniListStrategy({
        callbackURL: "/auth/anilist/callback",
        clientID: keys.aniList.clientId,
        clientSecret: keys.aniList.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log("passprot callback function fired")
        console.log(profile)
    })
)*/