import userDB from '../db/models/user.js';
import { generateJwtToken } from '../utils/jwt.js';

class AuthService {
  async loginUser(userName, password) {
    try {
      const user = await userDB.loginUser(userName);
      if (user.password !== password) {
        throw new Error('Invalid password');
      }
      const token = generateJwtToken(user.id, user.role);
      return { token, user }
    }
    catch (err) {
      console.error('Error logging in user:', err);
      throw err
    }
  }
  async getCurrentUser(id) {
    try {
      const user = await userDB.getCurrentUser(id);
      return user;
    }
    catch (err) {
      console.error('Error fetching current user:', err);
      throw err;
    }
  }
}

export default new AuthService();