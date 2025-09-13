import userDB from '../db/models/user.js';
import { comparePassword } from '../utils/bcrypt.js';
import { generateJwtToken } from '../utils/jwt.js';

class AuthService {
  async loginUser(userName, password) {
    try {
      const user = await userDB.loginUser(userName);
      const passwordMatch = await comparePassword(password, user.password);
      if (!user || !passwordMatch) {
        throw new Error('Invalid username or password');
      }
      
      const token = generateJwtToken(user.id, user.role);
      return { token, user }
    }
    catch (err) {
      console.error('AuthService: Failed logging in user:', err);
      throw err
    }
  }
  async getCurrentUser(id) {
    try {
      const user = await userDB.getCurrentUser(id);
      if (!user) {
        throw new Error('User not found');
      }
    }
    catch (err) {
      console.error('AuthService: Failed fetching current user:', err);
      throw err;
    }
  }
}

export default new AuthService();