export const generatePassword = (length = 12) => {
  if (length < 8 || length > 32) {
    throw new Error('Password length must be between 8 and 32.');
  }

  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '@$!%*?&';

  const all = lowercase + uppercase + numbers + special;

  const randomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];

  const password = [
    randomChar(lowercase),
    randomChar(uppercase),
    randomChar(numbers),
    randomChar(special),
  ];

  while (password.length < length) {
    password.push(randomChar(all));
  }

  // Fisher-Yates shuffle
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
};
