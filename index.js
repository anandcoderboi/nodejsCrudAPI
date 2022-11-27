import express from "express";

import bodyParser from "body-parser";

import userRoutes from "./routes/users.js";

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 5000;

app.get("/", (req, res) => {
  console.log("test");

  res.send("hello from homepage ");
});

app.use(bodyParser.json());

app.use("./users", userRoutes);

app.use("/users", userRoutes);
app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost: ${PORT}`)
);
