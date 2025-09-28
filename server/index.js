import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/Auth.js'
import cvRoutes from './routes/Cv.js'

dotenv.config();

const app =  express();
const PORT = process.env.PORT || 5000;


// Middlewares

app.use(cors());
app.use(express.json());


// Routes

app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);


app.get('/', (req, res) => {
    res.send('CV builder Backend is live');
});

// MongoDB  connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));
