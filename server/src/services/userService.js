import User from "../models/User.js";

const createUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
}

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
}

const deleteUser = async (userId) => {
    try {
        const result = await User.findByIdAndDelete(userId);
        return result;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
}

const updateUser = async (userId, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
}

export { createUser, getUserById, getAllUsers, deleteUser, updateUser };