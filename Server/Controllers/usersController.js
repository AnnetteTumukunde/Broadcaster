import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import users from '../Data/usersData';

dotenv.config();

const signup = (req, res) => {
    const id = users.length;
    const emailExist = users.find((userEmail) => {
        return userEmail.email === req.body.email;
    });
    if (emailExist) {
        res.status(401).json({ status: 401, error: 'Email already exist, rather signin' });
    }
    const { firstname, lastname, email, phoneNumber, type } = req.body;
    const password = bcrypt.hashSync(req.body.password);
    users.push({ id, firstname, lastname, email, phoneNumber, password, type });
    const payload = { id, firstname, lastname, email, phoneNumber, type };
    const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '150d' });
    res.status(201).json({
        status: 201,
        message: 'User created successfully',
        data: { token, details: { id, firstname, lastname, email, phoneNumber, password, type } },
    });
};

export default signup;
