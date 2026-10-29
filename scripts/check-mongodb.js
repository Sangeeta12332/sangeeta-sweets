const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");

async function checkMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MongoDB Connection Failed");
    console.error("MONGODB_URI is undefined. Please set MONGODB_URI in .env.local or .env");
    process.exitCode = 1;
    return;
  }

  if (uri.includes("<username>") || uri.includes("<password>")) {
    console.error("❌ MongoDB Connection Failed");
    console.error("MONGODB_URI contains placeholder '<username>' or '<password>'.");
    console.error("Please replace placeholders in .env.local with your real MongoDB Atlas credentials.");
    process.exitCode = 1;
    return;
  }

  try {
    const maskedUri = uri.replace(/:([^:@]+)@/, ":****@");
    console.log("Connecting to MongoDB:", maskedUri);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected Successfully");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);

    const collections =
      await mongoose.connection.db
        .listCollections()
        .toArray();

    console.log(
      "Collections:",
      collections.map((c) => c.name)
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

checkMongoDB();
