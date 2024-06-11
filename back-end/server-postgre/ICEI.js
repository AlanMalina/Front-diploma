// authService.js
import axios from "axios";

class ICEI {
  constructor() {
    this.baseUrl = 'https://id.gov.ua/api';
  }

  async getAccessToken(role) {
    const response = await axios.post(`${this.baseUrl}/auth/login`, {
      role,
      username: 'test-user',
      password: 'test-password',
    });
    return response.data.access_token;
  }

  async getUserInfo(role) {
    const accessToken = await this.getAccessToken(role);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios.get(`${this.baseUrl}/user`, { headers });
      return response.data;
    } catch (error) {
      throw error; // Re-throw the error for handling in the route
    }
  }
}

export default new ICEI();
