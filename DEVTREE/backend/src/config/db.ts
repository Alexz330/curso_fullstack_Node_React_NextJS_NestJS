import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGO_URI as string
    );
    const url = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(`MongoDB connected: ${url}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error: ", error.message);
    } else {
      console.error("Unknown error: ", error);
    }
    process.exit(1);
  }
};
