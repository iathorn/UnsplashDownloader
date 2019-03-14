import "@babel/polyfill";
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import axios from "axios";
import curlirize from "axios-curlirize";
import fs from "fs";
import path from "path";
import api from "./api";

dotenv.config();

const { PORT: port = 4000 } = process.env;

const app = new Koa();

curlirize(axios);

const router = new Router();
router.use("/api", api.routes());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, async () => {
  console.log("port:", port);
  try {
    const files = fs.readdirSync(path.join(__dirname, `../../`));
    files.forEach(file => {
      if (path.extname(file) === ".jpg") {
        fs.unlinkSync(path.join(__dirname, `../../${file}`));
      }
    });
    await axios.get(`http://localhost:${port}/api/unsplash`);
    console.log("hello!");
    // process.exit(0);
  } catch (e) {
    console.log(e);
  }

  // .then(res => {
  //   console.log('success');
  // })
  // .catch(err => console.log(err));
});
