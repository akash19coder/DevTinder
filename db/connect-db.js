const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://AkashSah:08JQYzSkD77dxxuy@cluster0.8kbrh5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/devTinder"
    );
  } catch (error) {
    throw new Error("Error in DB connection");
  }
};

module.exports = {
  connectDB,
};
