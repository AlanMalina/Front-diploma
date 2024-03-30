import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser"

class JwtToken{
    generateAccessToken(user) {
        const expiresIn = 900;
        const secretKey = 'ryjamavpazrobylacrmkuiproyshainternaturupoflluteru123';
        const payload = {
            id: user.id,
            email: user.email,
            username: user.userName,
            userasurname: user.userSurname
        };
        return jwt.sign(payload, secretKey, { expiresIn });
    }
    validateToken (req, res, next) {
        const accessToken = req.cookies["ACCESS_TOKEN"]
    
        if(!accessToken){
            return res.status(400).json({message: 'User is not authenticated!'})
        } 
    
        try{
            const secretKey = 'ryjamavpazrobylacrmkuiproyshainternaturupoflluteru123';
            const validToken = jwt.verify(accessToken, secretKey)
            if(validToken){
                req.authenticated = true;
                return next()
            }
        }catch(err){
            return res.status(500).json({message: err})
        }
    }
}

export default new JwtToken();