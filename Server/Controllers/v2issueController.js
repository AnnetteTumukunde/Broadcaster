import moment from 'moment';
import { pool } from '../Config/v2db';
import { validRecord } from '../Validation/allValid';

class Records {
    static async newRecord(req, res) {
        const { error } = validRecord.validation(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }
        const author = req.user.id;
        const date = moment().format('ll');
        const { title, location, comment, type } = req.body;
        const query = 'INSERT INTO incidents(title, date, comment, location, type, author) VALUES($1,$2,$3,$4,$5,$6) RETURNING *';
        const values = [title, date, comment, location, type, author];
        const addRecord = await pool.query(query, values);
        res.status(201).json({ status: 201, message: 'Created red-flag record', data: addRecord });
    }
}

export default Records;
