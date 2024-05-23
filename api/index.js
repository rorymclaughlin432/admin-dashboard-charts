const express = require("express");
const cors = require("cors");
const usercollection = require("./routes/usercollection.js");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", usercollection);

// start the Express server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
