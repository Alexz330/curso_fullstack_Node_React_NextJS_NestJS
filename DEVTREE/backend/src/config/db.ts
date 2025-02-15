import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGO_URI as string
    );
    const url = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(colors.cyan.bold(`MongoDB conectado en: ${url}`));

  } catch (error) {
    if (error instanceof Error) {
      console.error(colors.bgRed.white(`Error: : ${error.message}`));
    } else {
      console.error("Unknown error: ", error);
      console.error(colors.bgRed.white(`Unknown error: ${error}`));
    }
    process.exit(1);
  }
};
