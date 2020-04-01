const express = require("express");
mongoose = require("mongoose");
const app = express();
const db = require("./config/secrets").mongouri;
PORT = 3000 || process.env.PORT;

//body parser
app.use(express.urlencoded({ extended: false }));

//db connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("database connected");
  })
  .catch(err => console.log(err));

//routes
app.use("/", require("./routes/todo"));

//server running
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
