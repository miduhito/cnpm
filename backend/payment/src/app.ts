import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import orderRoutes from './routes/order.routes';
import { connectToDatabase } from './database';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/orders', orderRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

// Start the app after connecting to the database
const startApp = async () => {
  try {
    await connectToDatabase();
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start the app:', error);
    process.exit(1);
  }
};

startApp();

export default app;