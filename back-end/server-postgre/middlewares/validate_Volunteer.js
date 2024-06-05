import jwt from 'jsonwebtoken';
import JwtToken, { secretKey } from "../JWT-token.js"

const validateVolunteer = (req, res, next) => {
    
    const accessToken = req.headers["authorization"]

    // const accessToken = req.cookies["ACCESS_TOKEN"]

    jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err) {
              console.log('Invalid token')
                return res.status(401).json({ message: 'Invalid token' });
            }

            if (decoded.role === 'volunteer') {
              next()
            }else {
              return res.status(403).json({ message: 'Доступ заборонено' }); // Користувач не має необхідної ролі
            }
        })
  }

export default validateVolunteer;
