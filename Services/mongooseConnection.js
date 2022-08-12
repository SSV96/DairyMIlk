require("dotenv").config();

const mongoose = require("mongoose");
const url = `mongodb+srv://sathya-CMA:${process.env.MONGO_PASS}@cluster0.rgrk0.mongodb.net/DairyMilk`;
mongoose
  .connect(url, { useNewUrlParser: true })
  .then((data) => {
    console.log("Successfully Connected", data);
  })
  .catch((err) => {
    console.log(err);
    return;
  });
