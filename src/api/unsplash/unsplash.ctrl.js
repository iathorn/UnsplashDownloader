import Unsplash, { toJson } from "unsplash-js";
import dotenv from "dotenv";
import "@babel/polyfill";
import "isomorphic-fetch";
import fs from "fs";
import path from "path";
import axios from "axios";

dotenv.config();

const { APP_ACCESS_KEY: accessKey, APP_SECRET: secret } = process.env;

const unsplash = new Unsplash({
  applicationId: accessKey,
  secret
});

export const getPhotoList = async ctx => {
  console.log("getPhotoList");

  try {
    const json = await unsplash.photos.listPhotos(1, 15, "latest").then(toJson);

    // json => array

    for (let i = 0; i < json.length; i++) {
      await downloadPhoto(json[i], i, json.length);
    }

    ctx.status = 200;
  } catch (e) {
    console.log(e);
    ctx.throw(e, 500);
  }
};

// photoInfos: array of PhotoInfo
const downloadPhoto = async (photoInfo, index, length) => {
  try {
    const photoStream = await axios({
      method: "get",
      url: photoInfo.urls.full,
      responseType: "stream"
    });

    const writeStream = fs.createWriteStream(
      path.join(__dirname, `../../../../${photoInfo.id}.jpg`)
    );

    photoStream.data.pipe(writeStream).on("finish", () => {
      if (index === length - 1) {
        setTimeout(() => {
          console.log("exit!");
          process.exit(0);
        }, 3000);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
