import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import api from "./api";

dotenv.config();

const { PORT: port = 4000 } = process.env;

const app = new Koa();

const router = new Router();
router.use("/api", api.routes());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log("port:", port);
});
