import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔴 No token
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 👉 Format: "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    // 🔴 Invalid format
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Store user info
    req.user = decoded; // { id: user._id }

    next(); // go to controller

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;