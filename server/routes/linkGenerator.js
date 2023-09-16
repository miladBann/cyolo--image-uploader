const express = require('express');
const router = express.Router();
const { scheduleCleanup } = require('../routes/imageCleanup');

module.exports = function(upload, port, imageCache, imageExpirationMap) {

  router.put('/', upload.single('image'), (req, res) => {
    try {
      const { originalname: fileName, buffer: imageBuffer } = req.file;
      const { image, expirationTime } = req.body;
      const imageUrl = `http://localhost:${port}/v1/${fileName}`;
      console.log('Image uploaded:', imageUrl);
      
      imageCache.set(fileName, imageBuffer);
      imageExpirationMap.set(fileName, Date.now() + (expirationTime * 60000));
  
      res.json({ imageUrl });
      scheduleCleanup(imageCache, imageExpirationMap);
      
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }    
  });

  return router;
}


