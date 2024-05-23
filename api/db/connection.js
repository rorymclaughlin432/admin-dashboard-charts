require('dotenv').config()
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

//const URI = process.env.DATABASE_URL;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.opgyf7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

if (!uri) {
  throw new Error("Please define the DATABASE_URL environment variable");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admindashboard").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
})();


module.exports = client.db("admindashboard");