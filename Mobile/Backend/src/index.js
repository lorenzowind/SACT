const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { server } = require('./.env');

const app = express();

app.use(cors());

app.use(express.json());

routes(app);

process.setMaxListeners(0);

app.listen(server.port, () => {
  console.log(
    `Backend is working. Access ${server.host}:${server.port}`
  );
});
