const bcrypt = require('bcrypt');
const UserModel = require('../schemas/user-schema');
const jwt = require('../../../utils/jwt');

async function registerUser({ username, email, password, role }) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            role,
        });
        return user;
    } catch (err) {
        throw new Error('Error registering user');
    }
}

async function loginUser({ email, password }) {
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Invalid password');

        const token = jwt.generateToken(user);
        return { user, token };
    } catch (err) {
        throw new Error('Error logging in user');
    }
}

async function getUserById(id) {
    try {
        const user = await UserModel.findByPk(id);
        if (!user) throw new Error('User not found');
        return user;
    } catch (err) {
        throw new Error('Error fetching user');
    }
}

async function updateUser(id, updates) {
    try {
        await UserModel.update(updates, { where: { id } });
        return getUserById(id);
    } catch (err) {
        throw new Error('Error updating user');
    }
}

async function deleteUser(id) {
    try {
        await UserModel.destroy({ where: { id } });
    } catch (err) {
        throw new Error('Error deleting user');
    }
}

async function getAllUsers() {
    try {
        return await UserModel.findAll();
    } catch (err) {
        throw new Error('Error fetching users');
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
};
