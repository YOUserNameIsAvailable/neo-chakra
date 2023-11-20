import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://helloworld:helloworld@cluster1.aoxgo0g.mongodb.net/?retryWrites=true&w=majority'

if (!MONGODB_URI) {
  throw new Error('MongoDB URI not found in .env.local');
}

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'builder_ui',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export { connectToDatabase };

