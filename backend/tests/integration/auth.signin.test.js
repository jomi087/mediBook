import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { app } from '../../app.js';
import accountModel from '../../model/accountModel.js';
import { ROLES } from '../../constants/role.constants.js';
import { SALT_ROUNDS } from '../../constants/auth.constants.js';
import { env } from '../../config/env.js';

describe('POST /api/auth/signin', () => {
  const password = 'Password@123';

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    password,
    role: ROLES.PATIENT,
  };

  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await accountModel.create({
      ...user,
      password: hashedPassword,
    });
  });

  it('should login successfully', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: user.email,
      password,
    });

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      success: true,
      message: expect.any(String),
      data: {
        accessToken: expect.any(String),
        accountInfo: {
          id: expect.any(String),
          email: user.email,
          name: user.name,
          image: expect.any(String),
          role: ROLES.PATIENT,
        },
      },
    });
  });

  it('should return a valid JWT', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: user.email,
      password,
    });

    expect(res.status).toBe(200);

    const decoded = jwt.verify(res.body.data.accessToken, env.JWT_SECRET);

    expect(decoded.accountId).toBeDefined();
    expect(decoded.role).toBe(ROLES.PATIENT);
  });

  it('should reject incorrect password', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: user.email,
      password: 'WrongPassword@123',
    });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should reject unknown email', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: 'unknown@example.com',
      password,
    });

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('should reject missing email', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      password,
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject missing password', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: user.email,
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject invalid email', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: 'invalid-email',
      password,
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject weak password', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: user.email,
      password: 'password',
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject empty request body', async () => {
    const res = await request(app).post('/api/auth/signin').send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should not return password in the response', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: user.email,
      password,
    });

    expect(res.status).toBe(200);
    expect(res.body.data).not.toHaveProperty('password');
  });
});
