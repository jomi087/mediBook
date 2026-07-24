import 'dotenv/config';

import { connectTestDB, clearTestDB, disconnectTestDB } from './mongodb.js';

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});
