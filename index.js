const express = require("express");
const auth = require("./Routes/auth");
const app = express();
const mongoose = require("mongoose");
exports.MainURLS = (mongodb) => {
  connect(mongodb);
};
function connect(mongo) {
  mongoose
    .connect(mongo, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected");
    });
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", auth);
const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log("app is running at port 5000");
});
