import mongoose from "mongoose";
import "dotenv/config";

mongoose.connection.on("connected", () => console.log("db connected"));
mongoose.connection.on("open", () => console.log("db open"));
mongoose.connection.on("disconnected", () => console.log("db disconnected"));
mongoose.connection.on("reconnected", () => console.log("db reconnected"));
mongoose.connection.on("disconnecting", () => console.log("db disconnecting"));
mongoose.connection.on("close", () => console.log("db close"));

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/smartblog`);
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
