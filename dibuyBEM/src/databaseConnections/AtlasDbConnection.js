import mongoose from "mongoose";

const connectToRemoteDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    const remoteDbURI =
      "mongodb+srv://SrinuMeesala:SrinuMeesala@clusterdibuy.cjtyiva.mongodb.net/dibuy?retryWrites=true&w=majority";
    await mongoose.connect(remoteDbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Remote Atlas Database Connection Successful!");
  } catch (err) {
    console.log("Remote Atlas Database Connection Failed!");
  }
};

export default connectToRemoteDb;
