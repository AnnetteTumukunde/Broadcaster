import express from 'express';
import people from '../Controllers/v2usersController';
import Records from '../Controllers/v2issueController';
import auth from '../Authentication/v2auth';

const routes = express.Router();

routes.post('/api/v2/auth/signup', people.signup);
routes.post('/api/v2/auth/signin', people.signin);
routes.post('/api/v2/incident', auth, Records.newRecord);
routes.get('/api/v2/incidents', auth, Records.allRecords);
routes.get('/api/v2/incidents/:id([0-9]+)', auth, Records.specificRecord);
routes.patch('/api/v2/incident/:id([0-9]+)/location', auth, Records.editLocation);
routes.patch('/api/v2/incident/:id([0-9]+)/comment', auth, Records.editComment);
routes.delete('/api/v2/incidents/:id([0-9]+)', auth, Records.deleteRecord);
routes.patch('/api/v2/incident/:id([0-9]+)/status', auth, Records.changeStatus);

export default routes;
