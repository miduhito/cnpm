import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './app';
import { connectToDatabase } from './config/database';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Kết nối đến database
    await connectToDatabase();
    
    // Khởi động server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
