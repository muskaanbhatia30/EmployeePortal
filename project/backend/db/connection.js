import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.MONGO_URI;   // ✅ take from Kubernetes ConfigMap

if (!URI) {
  throw new Error("MONGO_URI is not defined");
}

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

try {
  // Connect the client to the server
  await client.connect();

  // Optional ping (safe)
  await client.db("admin").command({ ping: 1 });

  console.log("✅ Connected to MongoDB");

  // Use DB name from URI OR fallback
  db = client.db();
} catch (err) {
  console.error("❌ MongoDB connection failed:", err);
  process.exit(1);
}

export default db;
