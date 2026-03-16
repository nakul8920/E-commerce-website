import mongoose from 'mongoose';

let cached = global.__mongoose_conn__;
if (!cached) cached = global.__mongoose_conn__ = { promise: null };

const Connection = async () => {
    const URL =
        process.env.MONGODB_URI ||
        process.env.MONGO_URL ||
        `mongodb://localhost:27017/ECOMMERCE`;

    if (mongoose.connection?.readyState === 1) return mongoose.connection;

    if (!cached.promise) {
        cached.promise = mongoose.connect(URL);
    }

    try {
        await cached.promise;
        console.log('Database Connected Successfully');
        return mongoose.connection;
    } catch (error) {
        cached.promise = null;
        console.log('Error: ', error.message);
        throw error;
    }
};

export default Connection;