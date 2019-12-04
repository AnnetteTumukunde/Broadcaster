import express from 'express';
import people from '../Controllers/v2usersController';
import Records from '../Controllers/v2issueController';
import auth from '../Authentication/v2auth';

const routes = express.Router();

routes.post('/api/v2/auth/signup', people.signup);
routes.post('/api/v2/auth/signin', people.signin);
routes.post('/api/v2/incident', auth, Records.newRecord);

export default routes;
