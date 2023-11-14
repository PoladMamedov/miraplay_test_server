import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
const app = express();
app.use(express.json());
app.use(cors());

import { registerUser, findUser } from "./db/index.js";

const users = [];

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { email: req.body.email, name: req.body.name, password: hashedPassword };
    const addedUser = await registerUser(user);
    if (addedUser.error) {
      res.status(401).send(addedUser);
    }
    if (addedUser.success) {
      res.status(201).send(addedUser);
    }
  } catch {
    res.status(500).send();
  }
});

app.post("/login", async (req, res) => {
  const user = await findUser(req.body.email);
  if (user === null) {
    return res.status(400).send({ error: "There is no user with this email" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send(user);
    } else {
      res.send({ error: "Wrong password" });
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(3001);