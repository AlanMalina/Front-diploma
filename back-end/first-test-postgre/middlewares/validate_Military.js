import jwt from 'jsonwebtoken';
import JwtToken, { secretKey } from "../JWT-token.js"

const validateMilitary = (req, res) => {
    
    const accessToken = req.cookies["ACCESS_TOKEN"]

    jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            console.log(decoded);

            if (decoded.role === 'military') {
                res.status(200).json({message: "Користуйся на здоров'я"}); // Користувач має необхідну роль, продовжуємо
              } else {
                return res.status(403).json({ message: 'Доступ заборонено' }); // Користувач не має необхідної ролі
              }
        });
  }

export default validateMilitary;
