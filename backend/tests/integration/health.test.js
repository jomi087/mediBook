import request from 'supertest';
import { app } from '../../app.js';

describe('GET /health', () => {
  test('should return a healthy status response', async () => {
    //One specific test case

    // Arrange & Act
    const response = await request(app).get('/health');

    //Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Server is running',
      data: null,
    });
  });
});
