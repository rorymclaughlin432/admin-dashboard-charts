import express from "express";
import cors from "cors";
import usercollection from "./src/server/routes/usercollection.js";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", usercollection);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});