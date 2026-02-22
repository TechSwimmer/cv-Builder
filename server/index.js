import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import authRoutes from './routes/Auth.js'
import cvRoutes from './routes/Cv.js'
import parseResumeRoute from "./routes/parseResumeRoute.js"



const app =  express();
const PORT = process.env.PORT || 5000;


// Middlewares

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});
// Routes

app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);
app.use("/api/ai", parseResumeRoute);

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
