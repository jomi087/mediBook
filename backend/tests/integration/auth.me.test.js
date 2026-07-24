import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { app } from '../../app.js';
import accountModel from '../../model/accountModel.js';
import { ROLES } from '../../constants/role.constants.js';
import {
  ACCESS_TOKEN_EXPIRY,
  SALT_ROUNDS,
} from '../../constants/auth.constants.js';
import { env } from '../../config/env.js';

describe('GET /api/auth/me', () => {
  const password = 'Password@123';

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    password,
    role: ROLES.PATIENT,
  };

  let createdUser;
  let accessToken;

  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    createdUser = await accountModel.create({
      ...user,
      password: hashedPassword,
    });

    accessToken = jwt.sign(
      {
        accountId: createdUser._id.toString(),
        role: createdUser.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      }
    );
  });

  it('should return current account information', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      success: true,
      message: expect.any(String),
      data: {
        id: createdUser._id.toString(),
        email: user.email,
        name: user.name,
        image: expect.any(String),
        role: ROLES.PATIENT,
      },
    });
  });

  it('should reject request without token', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should reject invalid token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalid-token');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should reject expired token', async () => {
    const expiredToken = jwt.sign(
      {
        accountId: createdUser._id.toString(),
        role: createdUser.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: '-1s',
      }
    );

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${expiredToken}`);

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should reject token for non-existing account', async () => {
    await accountModel.findByIdAndDelete(createdUser._id);

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('should not expose password', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data).not.toHaveProperty('password');
  });
});
