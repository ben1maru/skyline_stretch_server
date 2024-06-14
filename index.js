const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const strech = require("./router/strech");
const authRoutes =require("./router/auth");
const application = require("./router/application");
const color = require("./router/color");
const coating = require("./router/coating")


// Middleware для обробки URL-кодованих тіл запитів
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/strech',strech);
app.use('/api/application', application);
app.use('/api/color',color);
app.use('/api/coating',coating)


app.get("/", (re, res) => {
  return res.json("from backend");
});
app.listen(3000, '::', () => {
  console.log(`Server listening on [::] 3000`);
});


module.exports=app;