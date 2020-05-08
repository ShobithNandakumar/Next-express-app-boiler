const express = require("express")();
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const bodyParser = require("body-parser");
const api = require("./api");

app.prepare().then(() => {
  express.use(bodyParser.json());
  express.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  express.use("/api", api);
  express.all("*", (req, res) => handle(req, res));

  express.listen(port, (err) => {
    if (err) throw err;
    console.log(`> App served on http://localhost:${port}`);
  });
});
