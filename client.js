const axios = require('axios');
const { decodeImage, encodeImage } = require('./img_preprocess.js');

const URL = "http://localhost:5000";

async function fetchImage(id) {
  const endpoint = `/img/${id}`;
  try {
    const response = await axios.get(`${URL}${endpoint}`);
    const img = response.data.image;
    decodeImage(img);
  } catch (error) {
    console.error('Error fetching image:', error.response ? error.response.data : error.message);
  }
}

async function postImage(path) {
  const img = encodeImage(path);
  const endpoint = "/img";
  const data = {
    id: "logo",
    image: img
  };
  console.log(`${URL}${endpoint}`);
 try {
    const response = await axios.post(`${URL}${endpoint}`, data);
    if (response.data === "OK") {
      console.log("Added Successfully!");
    }
  } catch (error) {
    console.error('Error posting image');
  }
}

if (require.main === module) {
  fetchImage('logo');
  //postImage("C:\\Users\\mo\\Desktop\\image_task\\image.jpg");
}


