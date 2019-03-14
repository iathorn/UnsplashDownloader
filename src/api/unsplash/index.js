import Router from "koa-router";
import * as unsplashCtrl from "./unsplash.ctrl";

const router = new Router();

router.get("/", unsplashCtrl.getPhotoList);

export default router;
