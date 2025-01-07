const authController = require("../controllers/authController");
const { login, register } = authController;

// beforeEach(async () => {
//   // Clear test database or relevant tables
//   await db.query("DELETE FROM clients WHERE email LIKE 'test%@example.com'");
// });

// TODO : make the phone number unique

describe("authController", () => {
  it("client registration", async () => {
    const req = {
      body: {
        email: "test" + Date.now() + "@example.com", // Make email unique
        username: "testUser" + Date.now(), // Make username unique
        password: "newPassword",
        role: "client",
        phoneNumber: "6677448833",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({
          id: expect.any(Number),
          username: expect.any(String),
        }),
      }),
    );
  });

  it("successful login", async () => {
    // First register a test user
    const testEmail = "test" + Date.now() + "@example.com";
    const testPassword = "testPassword123";

    // Register the user first
    const registerReq = {
      body: {
        email: testEmail,
        username: "testUser" + Date.now(),
        password: testPassword,
        role: "client",
        phoneNumber: "1234577890",
      },
    };

    const registerRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.register(registerReq, registerRes);

    // Then attempt login
    const loginReq = {
      body: {
        email: testEmail,
        password: testPassword,
        role: "client",
      },
    };

    const loginRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.login(loginReq, loginRes);
    expect(loginRes.status).toHaveBeenCalledWith(200);
    expect(loginRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });

  it("failed login due to incorrect credentials", async () => {
    const req = {
      body: {
        email: "invalid@example.com",
        password: "wrongPassword",
        role: "client",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Invalid credentials" }),
    );
  });
});
