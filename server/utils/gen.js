const crypto = require('crypto');

// Function to generate a secure random string
function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

// Generate secrets
console.log('JWT_ACCESS_SECRET:', generateSecret());
console.log('JWT_REFRESH_SECRET:', generateSecret());