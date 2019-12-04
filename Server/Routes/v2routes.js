import express from 'express';
import people from '../Controllers/v2usersController';
// import auth from '../Authentication/v2auth';

const routes = express.Router();

routes.post('/api/v2/auth/signup', people.signup);

export default routes;
