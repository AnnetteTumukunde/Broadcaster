import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import users from '../Data/usersData';

dotenv.config();

const auth = (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) {
        return res.status(400).json({ status: 400, message: 'Access denied. No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        const retrieve = users.find((user) => {
            return user.id;
        });
        if (!retrieve) {
            res.status(400).json({ status: 400, message: 'Provided Invalid Token' });
        }
        else {
            req.user = { id: decoded.id };
            next();
        }
    }
    catch (e) {
        return res.status(401).json({ status: 401, message: 'Invalid token' });
    }
};

export default auth;
