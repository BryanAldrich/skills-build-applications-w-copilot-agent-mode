import request from 'supertest';
import app from '../app';

describe('OctoFit API', () => {
  it('returns the health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('returns the backend message', async () => {
    const response = await request(app).get('/api');

    expect(response.status).toBe(200);
    expect(response.body.message).toContain('OctoFit');
  });

  it('returns workout suggestions', async () => {
    const response = await request(app).get('/api/workouts');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});
