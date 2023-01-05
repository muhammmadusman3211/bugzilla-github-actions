const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const JWTstrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt
const UserModel = require("../model/userModel")
const dotenv = require("dotenv")
dotenv.config()

passport.use(
  new JWTstrategy(
    {
      secretOrKey:
        "5dfa79cf9859655ea994887d20ad0352168ea1fb8f652700e1541ac2bcfbb6bdf058508ab02043e14cc5e01f6b3e0420b6c7b023ce297ea0fca3bfb6e4116658",
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)
