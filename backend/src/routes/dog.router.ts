import express from "express";
import { getDog, getDogs } from "../controllers/dog.controller";

export const dogRouter = express.Router();

dogRouter.get("/dog/:fileName", getDog);
dogRouter.get("/dogs", getDogs);
