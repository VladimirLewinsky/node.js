const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const pathToFile = path.join(__dirname, "pageviews.json");
const obj = {
  homepage: {
    name: "/",
    views: 0,
  },
  about: {
    name: "/about",
    views: 0,
  },
};

const newdata = JSON.parse(fs.readFileSync(pathToFile));

// console.log(newdata.homepage);
// const newdata = JSON.parse(nedata);
// console.log(newdata);

app.get("/", (req, res) => {
  newdata.homepage.views++;
  res.send(
    `<h1>Корневая страница</h1><br><h2>Колличество просмотров ${newdata.homepage.views}</h2><br><a href ='/about'>Ссылка на страницу /about</a>`
  );
  fs.writeFileSync(pathToFile, JSON.stringify(newdata, null, 2), () => {});
});
app.get("/about", (req, res) => {
  newdata.about.views++;
  res.send(
    `<h1>Страница about</h1><br><h2>Колличество просмотров ${newdata.about
      .views}</h2><br><a href ='/'>Ссылка на страницу /</a>`
  );
  fs.writeFileSync(pathToFile, JSON.stringify(newdata, null, 2), () => {});
});

const port = 3000;

app.listen(port, () => {
  console.log("Сервер запущен");
});
