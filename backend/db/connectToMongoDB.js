import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToMongoDB = async () => {
  try {
    console.log('process.env.MONGO_DB_URI', process.env.MONGO_DB_URI);

    await mongoose.connect(process.env.MONGO_DB_URI) 
    console.log('process.env.MONGO_DB_URI', process.env.MONGO_DB_URI);
    //     ,{
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error.message);
  }
};

export default connectToMongoDB;