import { signupSchema, signinSchema } from '../../validations/authSchema.js';

describe('Signup Schema', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password@123',
  };

  test('should validate correct signup data', () => {
    const result = signupSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  test('should reject invalid name', () => {
    const result = signupSchema.safeParse({
      ...validData,
      name: 'J',
    });

    expect(result.success).toBe(false);
  });

  test('should reject invalid email', () => {
    const result = signupSchema.safeParse({
      ...validData,
      email: 'invalid-email',
    });

    expect(result.success).toBe(false);
  });

  test('should reject weak password', () => {
    const result = signupSchema.safeParse({
      ...validData,
      password: 'password',
    });

    expect(result.success).toBe(false);
  });

  test('should reject missing fields', () => {
    const result = signupSchema.safeParse({});

    expect(result.success).toBe(false);
    expect(result.error.issues).toHaveLength(3);
  });
});

describe('Signin Schema', () => {
  const validData = {
    email: 'john@example.com',
    password: 'Password@123',
  };

  test('should validate correct signin data', () => {
    const result = signinSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  test('should reject invalid email', () => {
    const result = signinSchema.safeParse({
      ...validData,
      email: 'abc',
    });

    expect(result.success).toBe(false);
  });

  test('should reject weak password', () => {
    const result = signinSchema.safeParse({
      ...validData,
      password: '123',
    });

    expect(result.success).toBe(false);
  });

  test('should reject empty object', () => {
    const result = signinSchema.safeParse({});

    expect(result.success).toBe(false);
    expect(result.error.issues).toHaveLength(2);
  });
});
