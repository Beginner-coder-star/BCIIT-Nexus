import mongoose from "mongoose";

/** Strip .env wrapping quotes; do not append /db to URI when ?query= exists (breaks tls=true). */
function normalizeMongoUri(raw) {
  if (!raw || typeof raw !== "string") return "";
  let uri = raw.trim();
  if (
    (uri.startsWith("'") && uri.endsWith("'")) ||
    (uri.startsWith('"') && uri.endsWith('"'))
  ) {
    uri = uri.slice(1, -1).trim();
  }
  return uri;
}

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));

  const uri = normalizeMongoUri(process.env.MONGODB_URI);
  if (!uri) {
    console.error("MONGODB_URI is missing or empty");
    process.exit(1);
  }
  if (/<db_password>/i.test(uri)) {
    console.error(
      "MONGODB_URI still contains Atlas placeholder <db_password>. Replace it with your Database User password (Atlas → Database Access)."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { dbName: "bciitnexus" });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
