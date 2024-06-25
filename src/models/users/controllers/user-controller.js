const express = require('express');
const userService = require('../services/user-service');
const { authenticateToken, authorizeRole } = require('../../users/middlewares/auth');
const { userValidationRules, validate } = require('../../users/middlewares/user-validator');

const userRouter = express.Router();

userRouter.post('/register', userValidationRules(), validate, async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// Log in an existing user 
userRouter.post('/login', async (req, res) => {
    try {
        const { user, token } = await userService.loginUser(req.body);
        res.json({ success: true, data: { token } });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// Get the profile of the logged-in user
userRouter.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.json({ success: true, data: user });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// Update the profile of the logged-in user
userRouter.put('/editProfile', authenticateToken, async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.user.id, req.body);
        res.json({ success: true, data: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// Delete the profile of the logged-in user
userRouter.delete('/deleteProfile', authenticateToken, async (req, res) => {
    try {
        await userService.deleteUser(req.user.id);
        res.json({ success: true, message: 'Account deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// Get a list of all users (Admin only)
userRouter.get('/users', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ success: true, data: users });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = userRouter;
