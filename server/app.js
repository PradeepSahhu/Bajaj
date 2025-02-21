import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" folder
app.use(express.static("public"));

app.use(cookieParser());

// Routes declaration
app.use("/bfhl", userRoutes);

export { app };
