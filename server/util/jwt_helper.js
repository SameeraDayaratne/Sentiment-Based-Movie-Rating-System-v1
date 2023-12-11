import jwt  from "jsonwebtoken";
import createHttpError from "http-errors";

function signAccessToken(userId){

    
    const payload = {}
    
    const options = {
        expiresIn : "15s",
        issuer: "tmrs.com",
        audience : toString(userId)
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET , options);
    return accessToken
}

function signRefreshToken(userId){
    
    const payload = {}
    
    const options = {
        expiresIn : "1y",
        issuer: "tmrs.com",
        audience : toString(userId)
    }
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET , options);
    return refreshToken
}

function verifyAccessToken(req , res, next){

    if(!req.headers['authorization'])
    {
        return next(createHttpError.Unauthorized());
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(" ")[1];

    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , payload) => {
        if(err){
            if(err.name === "JsonWebTokenError")
            {
                return next(createHttpError.Unauthorized());
            }
            else{
                return next(createHttpError.Unauthorized(err.message));
            }            
        }

        req.payload = payload
        next();
    })
}


function verifyRefreshToken(refreshToken){

    jwt.verify(refreshToken , process.env.REFRESH_TOKEN_SECRET , (err, payload) => {
        if(err)
        {
            throw createHttpError.Unauthorized('sdsd');
        }


        const userId = payload.aud;

        console.log(userId);
        return userId;
    })
}

export {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}