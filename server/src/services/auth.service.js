import userDB from '../db/models/user.js';
import { comparePassword } from '../utils/bcrypt.js';
import { generateJwtToken } from '../utils/jwt.js';

class AuthService {
  async loginUser(userName, password) {
    try {
      const user = await userDB.loginUser(userName);
      if (user) {
        const passwordMatch = await comparePassword(password, user.password);
        if (passwordMatch) {
          const { accessToken, refreshToken } = generateJwtToken(user.id, user.role);
          return {
            refreshToken,
            accessToken,
            user
          };
        }
        throw new Error('Invalid username or password');
      }
      throw new Error('Invalid username or password');
    }
    catch (err) {
      console.error('AuthService: Failed logging in user:', err);
      throw err;
    }
  }
  async getCurrentUser(id) {
    try {
      const user = await userDB.getCurrentUser(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    }
    catch (err) {
      console.error('AuthService: Failed fetching current user:', err);
      throw err;
    }
  }
  async refreshAccessToken(userId, role) {
    try {
      const { accessToken } = generateJwtToken(userId, role);
      return { accessToken };
    }
    catch (err) {
      console.error('AuthService: Failed refreshing access token:', err);
      throw err;
    }
  }
}

export default new AuthService();