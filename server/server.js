import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './src/routes/route.js';

const app = express();
const port = 3000;

app.use(cors ({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

