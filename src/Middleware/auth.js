import jwt from 'jsonwebtoken';
import 'dotenv/config'
const createToken = (userInfo) => {
    return jwt.sign(userInfo, process.env.SECRET_KEY_ADMIN, {expiresIn:'1h'})
}
const VerifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({msg:"Token no autorizado"})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token,process.env.SECRET_KEY_ADMIN, (err, decoded)=>{
        if(err){
            return res.status(403).json({msg:"Fallo al autenticar"})
        }
        req.user=decoded
        next();
    })
}
export {createToken, VerifyToken}