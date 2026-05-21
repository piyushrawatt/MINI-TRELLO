import  User from "../Schema/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    // access token
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // refresh token
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // send response
res.json({
  accessToken,
  refreshToken,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email
  }
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};