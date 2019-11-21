import express from 'express';
import bodyparser from 'body-parser';
import routes from './Routes/routes';

const app = express();
const port = 1000;

app.use(express.json());
app.use(bodyparser.json());
app.get('/api/v1', (req, res) => {
    res.json({ status: 200, message: 'Welcome to the Broadcaster' });
});
app.use('/', routes);
app.listen(port, () => {
    console.log(`App listening on port : ${port}`);
});

export default app;
