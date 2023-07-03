import mongoose from 'mongoose';
const connectDB = async (mongo) => {
    try {
        await mongoose.connect(mongo);
        console.log("connected to database");
    } catch (error) {
        throw error;
    }
}

export default connectDB; 