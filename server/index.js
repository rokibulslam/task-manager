const dotenv = require("dotenv")
dotenv.config();
const app = require("./app");
const { errorHandler } = require("./src/middleware/errorHandler");


app.use(errorHandler)
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("App Run 5000");
});
