import express from 'express';
import { signup, signin } from '../Controllers/usersController';

const routes = express.Router();

routes.post('/api/v1/auth/signup', signup);
routes.post('/api/v1/auth/signin', signin);

export default routes;
