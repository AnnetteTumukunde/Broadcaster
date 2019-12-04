import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { validSignup } from '../Validation/allValid';
import { pool } from '../Config/v2db';

dotenv.config();

class people {
     static async signup(req, res) {
        const { error } = validSignup.validation(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }
        const verifyEmail = req.body.email;
        const verifyQuery = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(verifyQuery, [verifyEmail]);
        if (result.rows[0]) {
            res.status(401).json({ status: 401, error: 'Email already exist, rather signin' });
        }
        else {
            const { id, firstname, lastname, phoneNumber, type } = req.body;
            const password = bcrypt.hashSync(req.body.password);
            const query = 'INSERT INTO users(id, firstname, lastname, email, phone, password, type) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';
            const values = [id, firstname, lastname, verifyEmail, phoneNumber, password, type];
            const adduser = await pool.query(query, values);
            const payload = { id, firstname, lastname, verifyEmail, phoneNumber, type };
            const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '150d' });
            res.status(201).json({
                status: 201,
                message: 'User created successfully',
                data: { token, details: adduser.rows[0] },
            });
        }
    }
}

export default people;
