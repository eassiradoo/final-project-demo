const UserService = require("../services/userService");

class UserController {
  // GET /api/users/:id - Get user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: "Valid user ID is required",
        });
      }

      const user = UserService.getUserById(parseInt(id));

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        data: user,
        message: "User retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve user",
      });
    }
  }

  // POST /api/users - Create new user
  static async createUser(req, res) {
    try {
      const userData = req.body;

      const validation = UserService.validateUserData(userData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        });
      }

      // Check if email already exists
      const existingUser = UserService.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      const newUser = UserService.createUser(userData);

      res.status(201).json({
        success: true,
        data: newUser,
        message: "User created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create user",
      });
    }
  }

  // PUT /api/users/:id - Update user
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: "Valid user ID is required",
        });
      }

      const validation = UserService.validateUserData(updateData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        });
      }

      // Check if email already exists (excluding current user)
      if (updateData.email) {
        const existingUser = UserService.getUserByEmail(updateData.email);
        if (existingUser && existingUser.id !== parseInt(id)) {
          return res.status(409).json({
            success: false,
            message: "Email already exists",
          });
        }
      }

      const updatedUser = UserService.updateUser(parseInt(id), updateData);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        data: updatedUser,
        message: "User updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update user",
      });
    }
  }

  // DELETE /api/users/:id - Delete user
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: "Valid user ID is required",
        });
      }

      const deleted = UserService.deleteUser(parseInt(id));

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete user",
      });
    }
  }
}

module.exports = UserController;
