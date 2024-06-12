import passport from 'passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import { PRIVATE_KEY } from '../../utils/jwt.js'


const JWTStrategy = Strategy
const JWTExtract = ExtractJwt

const cookieExtractor=req =>{
    let token= null
    if(req && req.cookies) token =req.cookies['cookiesToken']
    return token
}

export const initializePassport= ()=>{
passport.use('jwt',new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: PRIVATE_KEY
}, async (jwt_payload, done)=>{
    try{
        return done( null, jwt_payload)

    }catch(error){
        return done(error)
    }
}))
}

