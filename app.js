const express = require("express");
const apiRouter = require("./routes/index");
const app = express();

app.use(express.json());
app.use("/", apiRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started Successfully");
  require("./Services/mongooseConnection");
});
