import { Console } from "console";
import express from "express";

import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];

router.get("/", (req, res) => {
  res.send({
    success: true,
    messege: "data fetched successfully",
    data: users,
  });
});

router.post("/", (req, res) => {
  const user = req.body;
  const firstName = user.firstName;

  if (firstName) {
    const userId = uuidv4();
    console.log(user);
    const userWithId = { ...user, id: userId };
    users.push({ ...user, id: uuidv4() });

    res.send(`user with the name ${user.firstName} added to the database`);
  } else {
    res.send({
      success: false,
      messege: "validation error",
      errors: [{ field: "firstName", messege: "cannot be empty" }],
    });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`user with the ${id} has been deleted`);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const user = users.find((user) => user.id === id);

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;
  res.send(`user with the ${id} has been updated`);
});

export default router;
