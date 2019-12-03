import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { validSignup, validSignin } from '../Validation/allValid';
import users from '../Data/usersData';

dotenv.config();

const signup = (req, res) => {
    const { error } = validSignup.validation(req.body);
    if (error) {
        return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    const id = users.length + 1;
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
        data: { token, details: { id, firstname, lastname, email, phoneNumber, type } },
    });
};

const signin = (req, res) => {
    const { error } = validSignin.validation(req.body);
    if (error) {
        return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    const { email, password } = req.body;
    const emailExist = users.find((userEmail) => {
        return userEmail.email === req.body.email;
    });
    if (!emailExist) {
        res.status(400).json({ status: 400, error: 'Incorrect email address, rather join' });
    }
    const passwordCheck = bcrypt.compareSync(req.body.password, emailExist.password);
    if (!passwordCheck) {
        res.status(400).json({ status: 400, error: 'Incorrect password' });
    }
    const { id, firstname, lastname, phoneNumber, type } = emailExist;
    const payload = { id, firstname, lastname, phoneNumber, password, type };
    const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '150d' });
    res.status(200).json({ status: 200, message: 'User is successfully logged in', data: { token, details: { id, firstname, lastname, email, phoneNumber, type } } });
};

export { signup, signin };
