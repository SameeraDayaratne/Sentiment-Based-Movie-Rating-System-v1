import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

let users = [];

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    users.push({ email: req.body.email, password: hashedPassword });
 
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);

  if (user == null) {
    return res.status(400).send("Cannot Find User");
  }

  console.log(user);

  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch (error) {
    res.status(500).send("server error" + error);
  }
});

export default router;
