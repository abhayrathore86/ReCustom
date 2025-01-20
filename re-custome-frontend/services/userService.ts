import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const UsersService = {
  /**
   * Fetch all users
   */
  async findAll() {
    try {
      const response = await axios.get(`${BASE_URL}/users/`);
      const { statusCode, message, data } = response.data;

      if (statusCode !== 200) {
        throw new Error(message || 'Failed to fetch users');
      }

      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Fetch a user by ID
   * @param id User ID
   */
  async getUserById(id: number) {
    try {
      const response = await axios.get(`${`${BASE_URL}/users/`}/users/${id}`);
      const { statusCode, message, data } = response.data;

      if (statusCode !== 200) {
        throw new Error(message || `Failed to fetch user with ID ${id}`);
      }

      return data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new user
   * @param userData New user data
   */
  async create(userData: { name: string; email: string; role: string }) {
    try {
      const response = await axios.post(`${BASE_URL}/users/`, userData);
      const { statusCode, message, data } = response.data;

      if (statusCode !== 201) {
        throw new Error(message || 'Failed to create user');
      }

      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Update a user by ID
   * @param id User ID
   * @param userData Updated user data
   */
  async update(
    id: number,
    userData: { name: string; email: string; role: string }
  ) {
    try {
      const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
      const { statusCode, message, data } = response.data;

      if (statusCode !== 200) {
        throw new Error(message || `Failed to update user with ID ${id}`);
      }

      return data;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a user by ID
   * @param id User ID
   */
  async delete(id: number) {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${id}`);
      const { statusCode, message, data } = response.data;

      if (statusCode !== 200) {
        throw new Error(message || `Failed to delete user with ID ${id}`);
      }

      return data;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * generate PDF by user ID
   * @param id User ID
   */
  async getPDF(id: number) {
    try {
      const response = await axios.get(`${BASE_URL}/pdf/${id}`, {
        responseType: 'blob',
      });
  
      const blob = response.data;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `user_report_${id}.pdf`;
      link.click();
  
    
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  },

    /**
   * login by user email
   * @param email User email
   */
    async login(email: string) {
      try {
        const response = await axios.post(`${BASE_URL}/users/login`,{email:email});
        const { statusCode, message, data } = response.data;
  
        if (statusCode !== 200) {
          throw new Error(message || `Failed to login user with email ${email}`);
        }
  
        return data;
      } catch (error) {
        console.error(`Error login user with email ${email}:`, error);
        throw error;
      }
    },
};
