const fs = require('fs');
const path = require('path');
const outputFilePath =  "C:\\Users\\mo\\Desktop\\image_task\\decoded.jpg";
function encodeImage(imageFilePath) {
  const imageBuffer = fs.readFileSync(imageFilePath);
  const base64ImageData = imageBuffer.toString('base64');
  return base64ImageData;
}

function decodeImage(base64String) {
  const imageBuffer = Buffer.from(base64String, 'base64');

  fs.writeFileSync(outputFilePath, imageBuffer);
  console.log('Image decoded and saved to', outputFilePath);
}

module.exports = {
  encodeImage,
  decodeImage
};

/***const base64ImageData = encodeImage("C:\\Users\\mo\\Desktop\\image_task\\image.jpg");
const outputFilePath =  "C:\\Users\\mo\\Desktop\\image_task\\decoded.jpg";
console.log('Base64 encoded image data:', base64ImageData);

decodeImage(base64ImageData, outputFilePath); **/


