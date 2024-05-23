const express = require("express");
const cors = require("cors");
const usercollection = require("./routes/usercollection.js");

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", usercollection);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});