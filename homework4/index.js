const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const Joi = require("joi");
let unId = 1;

const schema = Joi.object({
  firstName: Joi.string() .min(3).max(30).required(),
  lastname: Joi.string() .min(3).max(30).required(),
  age: Joi.number() .min(0).max(150).required(),
  city: Joi.string() .min(0).max(150).required(),
});

app.use(express.json());
const pathtoFile = path.join(__dirname, "users.json");

app.get("/users", (req, res) => {
  const newdata = JSON.parse(fs.readFileSync(pathtoFile));
  res.send(fs.readFileSync(pathtoFile));
});
app.get("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathtoFile));
  //   res.send(fs.readFileSync(pathtoFile));

  const user = users.find((user) => user.id === Number(req.params.id));
  if (user) {
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.post("/users", (req, res) => {
    const result = schema.validate(req.body);

   if(result.error){
    return res.status(404).send({error: result.error.details});
   }

  const users = JSON.parse(fs.readFileSync(pathtoFile));
  unId += 1;
  users.push({
    id: unId,
    ...req.body,
  });

  fs.writeFileSync(pathtoFile, JSON.stringify(users, null, 2));
  res.send({
    id: unId,
  });
});

app.put("/users/:id", (req, res) => {
   const result = schema.validate(req.body);

   if(result.error){
    return res.status(404).send({error: result.error.details});
   }

  const users = JSON.parse(fs.readFileSync(pathtoFile));
  let user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    user.firstName = req.body.firstName;
    user.lastname = req.body.lastname;
    user.age = req.body.age;
    user.city = req.body.city;

    fs.writeFileSync(pathtoFile, JSON.stringify(users, null, 2));

    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.delete("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathtoFile));
  let user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    fs.writeFileSync(pathtoFile, JSON.stringify(users, null, 2));
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log("Сервер запущен");
});
