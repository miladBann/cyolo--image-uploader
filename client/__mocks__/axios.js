export default {
    put: jest.fn(() => Promise.resolve({ data: { imageUrl: 'mockedImageUrl' } })),
};