import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import axios from "axios";
import curlirize from "axios-curlirize";
import api from "./api";

dotenv.config();

const { PORT: port = 4000 } = process.env;

const app = new Koa();

curlirize(axios);

const router = new Router();
router.use("/api", api.routes());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log("port:", port);
  axios
    .get("http://localhost:4000/api/unsplash")
    .then(res => console.log("hello", res))
    .catch(err => console.log(err));
});
