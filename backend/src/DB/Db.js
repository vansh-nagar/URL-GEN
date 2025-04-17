// add mognodb data base
import mongoose, { mongo } from "mongoose";

const DB = async () => {
  try {
    const mongoDbInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );

    console.log(
      `connected to mongoDB successfully || DB host ${mongoDbInstance.connection.host}  , ${process.env.PORT}`
    );
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default DB;
