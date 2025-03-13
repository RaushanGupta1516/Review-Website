import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

dotenv.config(); 

const app = express();

<<<<<<< HEAD
app.use('/posts', postRoutes);

=======
>>>>>>> 602abfaeeaef89b51b57d3ff05bf2985ab4262b4

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.MONGO_URI; 
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
    })
    .catch((error) => console.error(`MongoDB Connection Error: ${error.message}`));

mongoose.set('strictQuery', false);




