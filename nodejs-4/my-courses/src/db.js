const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27018/my-courses";

// Подключение к БД
const init = () => {
  try {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(error.message);
  }

  const db = mongoose.connection;

  db.on("error", (err) => console.error(err.message));
  db.once("open", () => console.info("Connected to MongoDB!"));
};

module.exports = {
  init,
};
