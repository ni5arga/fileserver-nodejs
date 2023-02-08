const http = require("http");

const fs = require("fs");

const path = require("path");

const mime = require("mime");

const hostname = "127.0.0.1";

const port = 8080;

const publicDirectory = "public";

const server = http.createServer((req, res) => {

  const filePath = path.join(__dirname, publicDirectory, req.url === "/" ? "index.html" : req.url);

  console.log(`${new Date().toUTCString()} - ${req.method} ${req.url}`);

  fs.exists(filePath, (exists) => {

    if (!exists) {

      res.statusCode = 404;

      res.end(`File not found: ${filePath}`);

      return;

    }

    fs.readFile(filePath, (err, data) => {

      if (err) {

        res.statusCode = 500;

        res.end(`Error getting the file: ${err}.`);

        return;

      }

      res.statusCode = 200;

      res.setHeader("Content-Type", mime.getType(filePath));

      res.end(data);

    });

  });

});

server.on("error", (err) => {

  console.error(`Server error: ${err}`);

});

server.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);

});

