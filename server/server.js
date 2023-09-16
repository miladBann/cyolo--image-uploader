const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

// configuring express app
const corsOptions = {
  origin: 'http://localhost:3000',
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
const port = 3001; 

// configuring multer to store pics in memory
const inMemoryStorage = multer.memoryStorage();
const upload = multer({ storage: inMemoryStorage });

// hashmaps to save image cache and expiration time
const imageCache = new Map();
const imageExpirationMap = new Map();

// configuring our server routes
const linkGenerator = require("./routes/linkGenerator")(upload, port, imageCache, imageExpirationMap);
const viewPhoto = require("./routes/viewPhoto")(imageCache);

app.use("/v1/file", linkGenerator);
app.use("/v1", viewPhoto);

const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


module.exports = {
  app,
  server,
  imageCache,
  imageExpirationMap,
};