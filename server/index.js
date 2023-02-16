const routes = require("./routes");
const express = require("express");

const app = express();

app.use("/", routes);

const PORT = 3050;

app.listen(PORT, () => console.log("Server running on port: " + PORT));
