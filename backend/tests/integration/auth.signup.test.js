import request from 'supertest';
import bcrypt from 'bcrypt';

import { app } from '../../app.js';
import accountModel from '../../model/accountModel.js';
import { ROLES } from '../../constants/role.constants.js';

describe('POST /api/auth/signup', () => {
  const validUser = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password@123',
  };

  it('should create a new account', async () => {
    const res = await request(app).post('/api/auth/signup').send(validUser);

    expect(res.status).toBe(201);

    expect(res.body).toEqual({
      success: true,
      message: expect.any(String),
      data: {
        accessToken: expect.any(String),
        accountInfo: {
          id: expect.any(String),
          email: validUser.email,
          name: validUser.name,
          image: expect.any(String),
          role: ROLES.PATIENT,
        },
      },
    });

    const user = await accountModel
      .findOne({ email: validUser.email })
      .select('+password');

    expect(user).not.toBeNull();
    expect(user.name).toBe(validUser.name);
    expect(user.email).toBe(validUser.email);
    expect(user.role).toBe(ROLES.PATIENT);
  });

  it('should hash the password before saving', async () => {
    await request(app).post('/api/auth/signup').send(validUser);

    const user = await accountModel
      .findOne({ email: validUser.email })
      .select('+password');

    expect(user).not.toBeNull();

    expect(user.password).not.toBe(validUser.password);

    const matched = await bcrypt.compare(validUser.password, user.password);

    expect(matched).toBe(true);
  });

  it('should reject duplicate email', async () => {
    await request(app).post('/api/auth/signup').send(validUser);

    const res = await request(app).post('/api/auth/signup').send(validUser);

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('should reject missing name', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      email: validUser.email,
      password: validUser.password,
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject short name', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        ...validUser,
        name: 'Jo',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject invalid name', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        ...validUser,
        name: 'John123',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        ...validUser,
        email: 'invalid-email',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject weak password', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        ...validUser,
        password: 'password123',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject missing password', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      name: validUser.name,
      email: validUser.email,
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject empty body', async () => {
    const res = await request(app).post('/api/auth/signup').send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
