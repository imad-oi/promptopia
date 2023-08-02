import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("====> using existing database connection");
    return Promise.resolve();
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("====> using new database connection");
  } catch (error) {
    console.log("====> error while connecting with database:\n", error);
    throw error;
  }
};
