require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();

const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const productRouter = require("./routes/productRoute");
const path = require('path');

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your React app's local development server address
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};


dbConnect();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(morgan("dev"));
app.use(cors())
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
