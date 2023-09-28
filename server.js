const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceKey.json');

const app = express();
const PORT = 5000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(express.json());

app.get('/img/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const image_data = await fetchImage(id);
    res.json({ image: image_data });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Error fetching image' });
  }
});

app.post('/img', async (req, res) => {
  const { id, image } = req.body;

  try {
    await writeImage(image, id);
    res.send('OK');
  } catch (error) {
    console.error('Error writing image:', error);
    res.status(500).json({ error: 'Error writing image' });
  }
});

async function writeImage(imageString, id) {
  const docRef = db.collection('uploadedImages').doc(id);
  await docRef.set({
    image_data: imageString
  });
}

async function fetchImage(id) {
  const docRef = db.collection('uploadedImages').doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    throw new Error('Image not found');
  }
  return doc.data().image_data;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
