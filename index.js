const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const urlRoutes = require("./Routes/urlRoutes");
const Url = require("./Models/Url");
require("./Database/dbConnection");
require("dotenv/config");

// Connect API to database
connectToDB();

// Middleware
app.use(cors({ origin: true }))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(urlRoutes);
app.use('/Public', express.static(`${process.cwd()}/Public`));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/Views/index.html');
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});