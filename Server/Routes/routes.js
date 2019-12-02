import express from 'express';
import { signup, signin } from '../Controllers/usersController';
import auth from '../Authentication/auth';
import { newRecord, allRecords, specificRecord, editLocation, editComment, deleteRecord } from '../Controllers/issueController';

const routes = express.Router();

routes.post('/api/v1/auth/signup', signup);
routes.post('/api/v1/auth/signin', signin);
routes.post('/api/v1/incident', auth, newRecord);
routes.get('/api/v1/incidents', auth, allRecords);
routes.get('/api/v1/incidents/:id([0-9]+)', auth, specificRecord);
routes.patch('/api/v1/incident/:id([0-9]+)/location', auth, editLocation);
routes.patch('/api/v1/incident/:id([0-9]+)/comment', auth, editComment);
routes.delete('/api/v1/incidents/:id([0-9]+)', auth, deleteRecord);

export default routes;
