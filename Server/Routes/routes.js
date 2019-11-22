import express from 'express';
import { signup, signin } from '../Controllers/usersController';
import auth from '../Authentication/auth';
import { createIncident, fetchIncident } from '../Controllers/issueController';

const routes = express.Router();

routes.post('/api/v1/auth/signup', signup);
routes.post('/api/v1/auth/signin', signin);
routes.post('/api/v1/incident', auth, createIncident);
routes.get('/api/v1/incidents', auth, fetchIncident);

export default routes;
