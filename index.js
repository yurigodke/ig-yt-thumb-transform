const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const proccessPath = 'img/';

const imageList = fs.readdirSync(proccessPath);

imageList.forEach(imageItem => {
  console.log('Start convert image ' + imageItem);
  const ext = path.extname(imageItem);

  if (ext == '.png') {
    const baseName = path.basename(imageItem, ext);

    Jimp.read(proccessPath + imageItem, (err, img) => {
      if (err) throw err;

      const mainImg = img.clone();
      mainImg
        .resize(Jimp.AUTO, 1080);

      img
        .resize(1920, Jimp.AUTO)
        .blur(25)
        .crop(0, (img.bitmap.height-1080)/2, 1920, 1080)
        .composite(mainImg, (1920-mainImg.bitmap.width)/2, 0)
        .quality(100)
        .write(`${proccessPath}${baseName} - yt${ext}`);

      console.log('Finish convert image ' + imageItem);
    });
  }
});
