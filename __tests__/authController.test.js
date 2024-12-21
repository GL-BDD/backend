const request = require('supertest');
const app = require('../app');
const AuthController = require('../controllers/authController');

describe('User Authentication API', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'testpass' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpass' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should fail to login with incorrect credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'wrongpass' });
        expect(response.status).toBe(401);
    });
});