import moment from 'moment';
import issueData from '../Data/issueData';
import { incidentValidation } from '../Validation/allValid';

const createIncident = (req, res) => {
    const { error } = incidentValidation.validation(req.body);
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

export default createIncident;
