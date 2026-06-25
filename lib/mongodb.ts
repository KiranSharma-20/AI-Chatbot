import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;
const cached = (global as any).mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  console.log(MONGODB_URL);
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL!).then((m) => m);
    console.log("Connected to MongoDB");
  }
  cached.conn = await cached.promise;
  return cached.conn;

};