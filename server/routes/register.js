import express from "express";
import { register } from "../controllers/index.js";

const { Router } = express;
const route = Router();

route.post("/", register)

export default route;