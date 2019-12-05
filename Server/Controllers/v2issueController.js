import moment from 'moment';
import { pool } from '../Config/v2db';
import { validRecord, validLocation, validComment, validStatus, validId } from '../Validation/allValid';

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
        res.status(201).json({ status: 201, data: [{ id: addRecord.rows[0].id, message: 'Created red-flag record' }] });
    }

    static async allRecords(req, res) {
        const query = 'SELECT * FROM incidents WHERE author = $1';
        const fetch = await pool.query(query, [req.user.id]);
        if (fetch.rows) {
            res.status(200).json({ status: 200, data: fetch.rows });
        }
        else {
            res.status(404).json({ status: 404, message: 'Incidents not found.' });
        }
    }

    static async specificRecord(req, res) {
        const { error } = validId.validation(req.params);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }
        const query = 'SELECT * FROM incidents WHERE id = $1 AND author = $2';
        const fetch = await pool.query(query, [parseInt(req.params.id), req.user.id]);
        if (fetch.rows < '1') {
            res.status(404).json({ status: 404, message: 'Incident not found.' });
        }
        else {
            res.status(200).json({ status: 200, data: fetch.rows[0] });
        }
    }

    static async editLocation(req, res) {
        const { bodyerror } = validLocation.validation(req.body);
        if (bodyerror) {
            return res.status(400).json({ status: 400, error: bodyerror.details[0].message });
        }
        const { paramserror } = validId.validation(req.params);
        if (paramserror) {
            return res.status(400).json({ status: 400, error: paramserror.details[0].message });
        }
        const { location } = req.body;
        const id = parseInt(req.params.id);
        const query = 'UPDATE incidents SET location = $1 WHERE id = $2 AND author = $3 RETURNING *';
        const update = await pool.query(query, [location, id, req.user.id]);
        if (!update.rows[0]) {
            res.status(404).json({ status: 404, message: 'Incident not found.' });
        }
        else {
            res.status(200).json({ status: 200, data: [{ id: update.rows[0].id, message: 'Updated incident record location' }] });
        }
    }

    static async editComment(req, res) {
        const { bodyerror } = validComment.validation(req.body);
        if (bodyerror) {
            return res.status(400).json({ status: 400, error: bodyerror.details[0].message });
        }
        const { paramserror } = validId.validation(req.params);
        if (paramserror) {
            return res.status(400).json({ status: 400, error: paramserror.details[0].message });
        }
        const { comment } = req.body;
        const id = parseInt(req.params.id);
        const query = 'UPDATE incidents SET comment = $1 WHERE id = $2 AND author = $3 RETURNING *';
        const update = await pool.query(query, [comment, id, req.user.id]);
        if (!update.rows[0]) {
            res.status(404).json({ status: 404, message: 'Incident not found.' });
        }
        else {
            res.status(200).json({ status: 200, data: [{ id: update.rows[0].id, message: 'Updated incident record location' }] });
        }
    }

    static async deleteRecord(req, res) {
        const { paramserror } = validId.validation(req.params);
        if (paramserror) {
            return res.status(400).json({ status: 400, error: paramserror.details[0].message });
        }
        const query = 'DELETE FROM incidents WHERE id = $1 AND author = $2 RETURNING *';
        const deleteRecord = await pool.query(query, [parseInt(req.params.id), req.user.id]);
        if (!deleteRecord.rows[0]) {
            res.status(404).json({ status: 404, message: 'Incident not found' });
        }
        else {
            res.status(200).json({ status: 200, data: [{ id: deleteRecord.rows[0].id, message: 'Record has been deleted' }] });
        }
    }

    static async changeStatus(req, res) {
        const { bodyerror } = validStatus.validation(req.body);
        if (bodyerror) {
            return res.status(400).json({ status: 400, error: bodyerror.details[0].message });
        }
        const { paramserror } = validId.validation(req.params);
        if (paramserror) {
            return res.status(400).json({ status: 400, error: paramserror.details[0].message });
        }
        const person = req.user.id;
        const type = 'admin';
        const adminquery = 'SELECT * FROM users WHERE type = $1 AND id = $2';
        const find = await pool.query(adminquery, [type, person]);
        if (find.rows < '1') {
            res.status(401).json({ status: 401, message: 'Unauthorized access' });
        }
        else {
            const { status } = req.body;
            const id = parseInt(req.params.id);
            const query = 'UPDATE incidents SET status = $1 WHERE id = $2 RETURNING *';
            const update = await pool.query(query, [status, id]);
            if (!update.rows[0]) {
                res.status(404).json({ status: 404, message: 'Incident not found.' });
            }
            else {
                res.status(200).json({ status: 200, data: [{ id: update.rows[0].id, message: 'Updated incident record status' }] });
            }
        }
    }
}

export default Records;
