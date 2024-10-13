import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import userRouter from './routes/user/routes';
import notesRouter from './routes/note/routes';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/u', userRouter);
app.use('/n', notesRouter);

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})