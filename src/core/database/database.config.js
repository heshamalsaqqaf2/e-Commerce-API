import mongoose from 'mongoose';
import dotevn from 'dotenv';
dotevn.config();

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI Is Not Defined In .env');
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully: ', mongoose.connection.db.databaseName);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};
