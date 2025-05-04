import { createConnection, Connection } from 'typeorm';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

export const connectToDatabase = async (): Promise<Connection> => {
  try {
    const connection = await createConnection({
      type: 'postgres', // hoặc mysql, sqlite...
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'fastfood',
      entities: [Order, Product],
      synchronize: true, // Chỉ dùng trong môi trường phát triển
      logging: process.env.NODE_ENV !== 'production',
    });
    
    console.log('Connected to database successfully!');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};
