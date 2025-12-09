import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use((err, req, res, next) => {
    console.error("❌ LỖI SERVER:", err); // In lỗi ra Terminal
    res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi ở Server",
        error: err.message || err // Trả về lỗi JSON thay vì HTML
    });
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//Tăng timeout server lên 5 phút
server.setTimeout(300000);