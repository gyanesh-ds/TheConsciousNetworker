const mongoose = require("mongoose");
const db = process.env.DB;
mongoose
  .connect(db)
  .then(() => {
    console.log("db Connected");
  })
  .catch((err) => {
    console.log(err);
  });
