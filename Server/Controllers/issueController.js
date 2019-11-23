import moment from 'moment';
import issueData from '../Data/issueData';
import { validRecord, validLocation, validComment } from '../Validation/allValid';

const newRecord = (req, res) => {
    const { error } = validRecord.validation(req.body);
    if (error) {
        return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    const id = issueData.length;
    const date = moment().format('ll');
    const author = req.user.uid;
    const { title, location, comment, status, type, image, video } = req.body;
    issueData.push({ id, date, author, title, location, comment, status, type, image, video });
    res.status(201).json({ status: 201, data: [{ id, message: 'Created red-flag record' }, { date, author, title, location, comment, status, type, image, video }] });
};

const allRecords = (req, res) => {
    const author = req.user.uid;
    res.status(200).json({ status: 200, data: [{ author, issueData }] });
};

const specificRecord = (req, res) => {
    const author = req.user.uid;
    const search = issueData.find((incident) => {
        return incident.id === parseInt(req.params.id);
    });
    if (search) {
        res.status(200).json({ status: 200, data: { author, search } });
    }
    else {
        res.status(404).json({ status: 404, message: 'Failed to find incident' });
    }
};

const editLocation = (req, res) => {
    const { error } = validLocation.validation(req.body);
    if (error) {
        return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    const author = req.user.uid;
    const search = issueData.find((incident) => {
        return incident.id === parseInt(req.params.id);
    });
    if (search) {
        const place = issueData.find((incident) => {
            return incident.location === req.params.location;
        });
        if (place) {
            const newChanges = {
                id: search.id,
                date: search.date,
                author,
                title: search.title,
                comment: search.comment,
                location: req.body.location,
                status: search.status,
                type: search.type,
            };
            const before = issueData.splice(issueData.indexOf(search), 1, newChanges);
            res.status(200).json({ status: 200, data: [{ id: search.id, message: 'Updated incident record location', before, newChanges }] });
        }
        else {
            res.status(400).json({ status: 400, message: 'Unmatching incident location' });
        }
    }
    else {
        res.status(404).json({ status: 404, message: 'Failed to find that incident' });
    }
};

const editComment = (req, res) => {
    const { error } = validComment.validation(req.body);
    if (error) {
        return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    const author = req.user.uid;
    const search = issueData.find((incident) => {
        return incident.id === parseInt(req.params.id);
    });
    if (search) {
        const incComment = issueData.find((incident) => {
            return incident.comment === req.params.comment;
        });
        if (incComment) {
            const newChanges = {
                id: search.id,
                date: search.date,
                author,
                title: search.title,
                comment: req.body.comment,
                location: search.location,
                status: search.status,
                type: search.type,
            };
            const before = issueData.splice(issueData.indexOf(search), 1, newChanges);
            res.status(200).json({ status: 200, data: [{ id: search.id, message: 'Updated incident record comment', before, newChanges }] });
        }
        else {
            res.status(400).json({ status: 400, message: 'Unmatching incident comment' });
        }
    }
    else {
        res.status(404).json({ status: 404, message: 'Failed to find that incident' });
    }
};

export { newRecord, allRecords, specificRecord, editLocation, editComment };
