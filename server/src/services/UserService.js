import jwt from "jsonwebtoken";
import db from "../db/models/index.js";
import config from "../configs/auth.config.js";

export default class UserService {
  async updateUser(id, user) {
    const userRecord = await db.User.update(
      { name: user.name },
      { where: { id: id } }
    );
    if (!userRecord) {
      throw new Error("User not found!");
    }
    return { user: userRecord };
  }
  async deleteUser(user) {}
  async deleteAllUsers(user) {}
  async findByUser(user) {}
}
