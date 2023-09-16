const request = require('supertest');
const { app, server } = require('../server');

describe('File Retention Logic', () => {

  afterAll((done) => {
    server.close(done);
  });

  // Helper function to upload an image with an expiration time
  async function uploadImage(imageBuffer, expirationTime) {
    const response = await request(app)
      .put('/v1/file')
      .field('expirationTime', expirationTime)
      .attach('image', imageBuffer, 'test.jpg');

    return response.body.imageUrl;
  }

  it('should retain images until their expiration time', async () => {
    // Upload an image with a 5-second expiration time
    const imageUrl = await uploadImage(Buffer.from('test image data'), 5);

    // Wait for a bit more than 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 6000));

    // Try to fetch the expired image
    const response = await request(app).get(`/v1/${imageUrl}`);

    expect(response.status).toBe(404);
  }, 10000);
});
