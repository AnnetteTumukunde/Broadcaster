import express from 'express';

const app = express();
const port = 1000;

app.use(express.json());
app.get('/', (req, res) => {
    res.json({ status: 200, message: 'Welcome to the Broadcaster' });
});
app.listen(port, () => {
    console.log(`App listening on port : ${port}`);
});

export default app;
