import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes.js"


//load enviorment variables
dotenv.config({
  path:".env"
});


const app = express();


//middleware
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    exposedHeaders: ["Set-Cookie", "*"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/api/v1/users',userRoutes);


//test
app.get("/", (req, res) => {
  res.send("Hello World! with Prisma");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
