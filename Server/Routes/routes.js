import express from 'express';
import signup from '../Controllers/usersController';

const routes = express.Router();

routes.post('/api/v1/auth/signup', signup);

export default routes;
