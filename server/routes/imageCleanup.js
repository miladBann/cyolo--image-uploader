

function cleanupExpiredImages(imageCache, imageExpirationMap) {

  if (process.env.NODE_ENV === 'test') {
    return;
  }

  const now = Date.now();
  for (const [fileName, expirationTime] of imageExpirationMap.entries()) {
    if (now >= expirationTime) {
      imageCache.delete(fileName);
      imageExpirationMap.delete(fileName);
      console.log(`Image expired and removed: ${fileName}`);
    }
  }

}


function scheduleCleanup(imageCache, imageExpirationMap) {
  setInterval(() => cleanupExpiredImages(imageCache, imageExpirationMap), 1000); // Run every 1 second
}


module.exports = {
    cleanupExpiredImages,
    scheduleCleanup,
};