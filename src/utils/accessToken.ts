import CryptoJS from 'crypto-js';

const SECRET_KEY = 'tvlanding_2024_secret_key';

export function generateAccessToken(data: {
  name: string;
  age: string;
  tags: string[];
  exp: boolean;
  priority: string;
}): string {
  const payload = {
    timestamp: Date.now(),
    data,
    nonce: Math.random().toString(36).substring(2, 15)
  };
  return CryptoJS.AES.encrypt(JSON.stringify(payload), SECRET_KEY).toString();
}
