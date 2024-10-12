import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user/routes';
import notesRouter from './routes/note/routes';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/u', userRouter);
app.use('/n', notesRouter);

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})