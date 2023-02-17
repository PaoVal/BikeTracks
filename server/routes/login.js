import express from "express";
import { login } from "../controllers/index.js";

const { Router } = express;
const route = Router();

route.post("/", login)

export default route;