import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @route   POST /api/auth/google
// @desc    Authenticate user with Google
// @access  Public
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
        role: 'client', // Default role for Google sign-ups
        isActive: true,
        password: Math.random().toString(36).slice(-8), // Random password (won't be used)
      });
    } else {
      // Update Google ID and avatar if not set
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (!user.avatar && picture) {
        user.avatar = picture;
      }
      user.lastLogin = new Date();
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Google authentication failed';
    
    if (error.message?.includes('Token used too early')) {
      errorMessage = 'Invalid token timing. Please try again.';
    } else if (error.message?.includes('Invalid token')) {
      errorMessage = 'Invalid Google token. Please try again.';
    } else if (error.message?.includes('audience')) {
      errorMessage = 'Google Client ID mismatch. Please contact support.';
    }
    
    res.status(401).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
