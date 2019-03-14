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

  await unsplash.photos
    .listPhotos(1, 15, "latest")
    .then(toJson)
    .then(json => {
      ctx.body = json;
      ctx.status = 200;
      downloadPhoto(json);
    })
    .catch(err => {
      ctx.throw(err, 500);
    });
};

// photoInfos: array of PhotoInfo
const downloadPhoto = async photoInfos => {
  try {
    for (let i = 0; i < photoInfos.length; i++) {
      await axios({
        method: "get",
        url: photoInfos[i].urls.full,
        responseType: "stream"
      }).then(response => {
        response.data.pipe(
          fs.createWriteStream(
            path.join(__dirname, `../../../../${photoInfos[i].id}.jpg`)
          )
        );
      });
    }
  } catch (e) {
    console.log(e);
  }
};
