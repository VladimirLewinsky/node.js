// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require("http");
let counter = 0;
let count = 0
const server = http.createServer((req, res) => {
  console.log("запрос получен");
 
  if (req.url === "/") {
    ++counter;
    res.writeHead(200, { "Content-Type": "text/html; chartset=UTF-8" });
    res.end(
      `<h1>Welcome<h1>
      <br> <a href="/about">page /about <a><h1>${counter}<h1>`
    );
  } else if (req.url === "/about") {
    ++count;
    res.writeHead(200, { "Content-Type": "text/html; chartset=UTF-8" });

    res.end(`<h1>Welcome to about<h1><br> <a href="/">page /<a><h1>Page view: ${count}<h1>`);
  } else {
    res.writeHead(404, { "Content-Type": "text/html; chartset=UTF-8" });
    res.end("Server Not Found");
  }
});
server.listen(3000, () => {
  console.log("server is on port 3000");
});
