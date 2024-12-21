const request = require('supertest');
const express = require('express');
const artisanController = require('../controllers/artisanController');
const db = require('../db'); // Add database connection

// Mock database queries
jest.mock('../db', () => ({
  query: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/artisans', artisanController);

describe('Artisan API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('GET /api/artisans should return all artisans', async () => {
    const mockArtisans = [
      { id: 1, name: 'Test Artisan 1' },
      { id: 2, name: 'Test Artisan 2' }
    ];
    
    db.query.mockResolvedValueOnce({ rows: mockArtisans });
    
    const response = await request(app).get('/api/artisans');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(mockArtisans);
  });

  test('POST /api/artisans should create a new artisan', async () => {
    const newArtisan = {
      name: 'New Artisan',
      specialization: 'Woodworking',
      contactInfo: '1234567890',
      portfolio: 'portfolio.com',
      certifications: 'cert1',
      insuranceDetails: 'insurance1'
    };
    
    db.query.mockResolvedValueOnce({ 
      rows: [{ ...newArtisan, id: 1 }]
    });
    
    const response = await request(app)
      .post('/api/artisans')
      .send(newArtisan);
      
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newArtisan);
  });

  test('GET /api/artisans/:id should return a single artisan', async () => {
    const mockArtisan = {
      id: 1,
      name: 'Test Artisan',
      specialization: 'Woodworking'
    };
    
    db.query.mockResolvedValueOnce({ rows: [mockArtisan] });
    
    const response = await request(app).get('/api/artisans/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockArtisan);
  });

  test('PUT /api/artisans/:id should update an artisan', async () => {
    const updatedArtisan = {
      name: 'Updated Artisan',
      specialization: 'Updated Specialty'
    };
    
    db.query.mockResolvedValueOnce({ 
      rows: [{ id: 1, ...updatedArtisan }]
    });
    
    const response = await request(app)
      .put('/api/artisans/1')
      .send(updatedArtisan);
      
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedArtisan);
  });
});