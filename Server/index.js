import express from 'express';
import bodyparser from 'body-parser';
import routes from './Routes/v1routes';
import route from './Routes/v2routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(bodyparser.json());
app.get('/api/v1', (req, res) => {
    res.json({ status: 200, message: 'Welcome to the Broadcaster' });
});
app.get('/api/v2', (req, res) => {
    res.json({ status: 200, message: 'Welcome to the Broadcaster database' });
});
app.use('/', routes);
app.use('/', route);
app.listen(port, () => {
    console.log(`App listening on port : ${port}`);
});

export default app;
