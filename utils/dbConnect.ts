import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;
const mockMongoURL =
  "mongodb+srv://username:password@clusterone.gcnbb.mongodb.net/booking?retryWrites=true&w=majority";
const mongoURL = process.env.MONGO_URI! || mockMongoURL;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    console.log("mongo cached connect");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(mongoURL, opts).then((mongoose) => {
      console.log("mongo connected");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
