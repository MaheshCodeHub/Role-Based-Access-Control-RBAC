import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Make sure this is at the very top
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "../middleware/errorMiddleware.js"; // Add `.js` extension for ES modules

const configureServer = (app) => {
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("public"));

  app.use(errorMiddleware);

  return app;
};

export default configureServer;
