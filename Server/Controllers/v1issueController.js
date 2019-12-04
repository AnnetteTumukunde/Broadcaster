import moment from 'moment';
import issueData from '../Data/issueData';
import { validRecord, validLocation, validComment } from '../Validation/allValid';

const newRecord = (req, res) => {
    const { error } = validRecord.validation(req.body);
    if (error) {
        return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    const author = req.user.id;
    const id = issueData.length + 1;
    const date = moment().format('ll');
    const { title, location, comment, status, type, image, video } = req.body;
    issueData.push({ id, date, author, title, location, comment, status, type, image, video });
    res.status(201).json({ status: 201, message: 'Created red-flag record', data: [{ id, date, author, title, location, comment, status, type, image, video }] });
};

const allRecords = (req, res) => {
    const find = issueData.find((user) => {
        return user.author === req.user.id;
    });
    if (find) {
        res.status(200).json({ status: 200, data: issueData });
    }
    else {
        res.status(404).json({ status: 404, message: 'No created incidents yet.' });
    }
};

const specificRecord = (req, res) => {
    const find = issueData.find((user) => {
        return user.author === req.user.id;
    });
    if (find) {
        const search = issueData.find((incident) => {
            return incident.id === parseInt(req.params.id);
        });
        if (search) {
            res.status(200).json({ status: 200, data: search });
        }
        else {
            res.status(404).json({ status: 404, message: 'Failed to find incident' });
        }
    }
    else {
        res.status(404).json({ status: 404, message: 'No created incidents yet.' });
    }
};

const editLocation = (req, res) => {
    const { error } = validLocation.validation(req.body);
    if (error) {
        return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    const find = issueData.find((user) => {
        return user.author === req.user.id;
    });
    if (find) {
        const search = issueData.find((incident) => {
            return incident.id === parseInt(req.params.id);
        });
        if (search) {
            const newChanges = {
                id: search.id,
                date: search.date,
                title: search.title,
                comment: search.comment,
                location: req.body.location,
                status: search.status,
                type: search.type,
            };
            issueData.splice(issueData.indexOf(search), 1, newChanges);
            res.status(200).json({ status: 200, data: [{ id: search.id, message: 'Updated incident record location' }] });
        }
        else {
            res.status(404).json({ status: 404, message: 'Failed to find that incident' });
        }
    }
    else {
        res.status(404).json({ status: 404, message: 'No created incidents yet.' });
    }
};

const editComment = (req, res) => {
    const { error } = validComment.validation(req.body);
    if (error) {
        return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    const find = issueData.find((user) => {
        return user.author === req.user.id;
    });
    if (find) {
        const search = issueData.find((incident) => {
            return incident.id === parseInt(req.params.id);
        });
        if (search) {
            const newChanges = {
                id: search.id,
                date: search.date,
                title: search.title,
                comment: req.body.comment,
                location: search.location,
                status: search.status,
                type: search.type,
            };
            issueData.splice(issueData.indexOf(search), 1, newChanges);
            res.status(200).json({ status: 200, data: [{ id: search.id, message: 'Updated incident record comment' }] });
        }
        else {
            res.status(404).json({ status: 404, message: 'Failed to find that incident' });
        }
    }
    else {
        res.status(404).json({ status: 404, message: 'No created incidents yet.' });
    }
};

const deleteRecord = (req, res) => {
    const find = issueData.find((user) => {
        return user.author === req.user.id;
    });
    if (find) {
        const search = issueData.find((incident) => {
            return incident.id === parseInt(req.params.id);
        });
        if (search) {
            issueData.splice(issueData.indexOf(search), 1);
            res.status(200).json({ status: 200, data: [{ id: search.id, message: 'Record has been deleted' }] });
        }
        else {
            res.status(404).json({ status: 404, message: 'Failed to find that incident' });
        }
    }
    else {
        res.status(404).json({ status: 404, message: 'No created incidents yet.' });
    }
};

export { newRecord, allRecords, specificRecord, editLocation, editComment, deleteRecord };
