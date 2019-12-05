import moment from 'moment';
import { pool } from '../Config/v2db';
import { validRecord, validLocation, validComment, validStatus } from '../Validation/allValid';

class Records {
    static async newRecord(req, res) {
        const { error } = validRecord.validation(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }
        const author = req.user.id;
        const date = moment().format('ll');
        const { title, location, status, comment, type } = req.body;
        const query = 'INSERT INTO incidents(title, date, comment, status, location, type, author) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';
        const values = [title, date, comment, status, location, type, author];
        const addRecord = await pool.query(query, values);
        res.status(201).json({ status: 201, message: 'Created red-flag record', data: addRecord.rows[0] });
    }

    static async allRecords(req, res) {
        const query = 'SELECT * FROM incidents WHERE author = $1';
        const fetch = await pool.query(query, [req.user.id]);
        if (fetch.rows) {
            res.status(200).json({ status: 200, data: fetch.rows });
        }
        else {
            res.status(404).json({ status: 404, message: 'No created incidents yet.' });
        }
    }

    static async specificRecord(req, res) {
        const query = 'SELECT * FROM incidents WHERE id = $1 AND author = $2';
        const fetch = await pool.query(query, [parseInt(req.params.id), req.user.id]);
        if (fetch.rows < '1') {
            res.status(404).json({ status: 404, message: 'Failed to find incident' });
        }
        else {
            res.status(200).json({ status: 200, data: fetch.rows[0] });
        }
    }

    static async editLocation(req, res) {
        const { error } = validLocation.validation(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }
        const { location } = req.body;
        const id = parseInt(req.params.id);
        const query = 'UPDATE incidents SET location = $1 WHERE id = $2 AND author = $3';
        const update = await pool.query(query, [location, id, req.user.id]);
        if (update.rows[0]) {
            res.status(404).json({ status: 404, message: 'Failed to find that incident' });
        }
        else {
            res.status(200).json({ status: 200, data: update.rows[0], message: 'Updated incident record location' });
        }
    }
  
    static async editComment(req, res) {
        const { error } = validComment.validation(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }
        const { comment } = req.body;
        const id = parseInt(req.params.id);
        const query = 'UPDATE incidents SET comment = $1 WHERE id = $2 AND author = $3';
        const update = await pool.query(query, [comment, id, req.user.id]);
        if (update.rows[0]) {
            res.status(404).json({ status: 404, message: 'Failed to find that incident' });
        }
        else {
            res.status(200).json({ status: 200, data: update.rows[0], message: 'Updated incident record location' });
        }
    }

    static async deleteRecord(req, res) {
        const query = 'DELETE FROM incidents WHERE id = $1 AND author = $2';
        const deleteRecord = await pool.query(query, [parseInt(req.params.id), req.user.id]);
        if (deleteRecord.rows[0]) {
            res.status(404).json({ status: 404, message: 'Failed to find that incident' });
        }
        else {
            res.status(200).json({ status: 200, message: 'Record has been deleted' });
        }
    }

    static async changeStatus(req, res) {
        const { error } = validStatus.validation(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }
        const person = req.user.id;
        const adminquery = 'SELECT * FROM users WHERE type = $1';
        const find = await pool.query(adminquery, [person]);
        if (!find.rows) {
            res.status(401).json({ status: 401, message: 'Unauthorized access' });
        }
        else {
            const { status } = req.body;
            const id = parseInt(req.params.id);
            const query = 'UPDATE incidents SET status = $1 WHERE id = $2';
            const update = await pool.query(query, [status, id]);
            if (update.rows[0]) {
                res.status(404).json({ status: 404, message: 'Failed to find that incident' });
            }
            else {
                res.status(200).json({ status: 200, data: update.rows[0], message: 'Updated incident record status' });
            }
        }
    }
}

export default Records;
