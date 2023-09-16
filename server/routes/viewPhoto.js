const express = require('express');
const router = express.Router();

module.exports = function(imageCache) {
    router.get('/:fileUrl', (req, res) => {
        try {
            const { fileUrl } = req.params;
      
            const imageBuffer = imageCache.get(fileUrl);
        
            if (imageBuffer) {
                res.setHeader('Content-Type', 'image/jpeg');
                res.end(imageBuffer);
            } else {
                res.status(410).send('Image gone');
            }
        } catch (error) {
            console.log(error);
            res.status(404).send('Image not found');
        }
        
    });

    return router;
}