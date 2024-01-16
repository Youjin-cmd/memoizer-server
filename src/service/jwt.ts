import jwt from "jsonwebtoken";
import User from "../models/User";
import errors from "../constants/errors";

import CONFIG from "../constants/config";

export function generateAccessToken(user) {
  try {
    return jwt.sign({ id: user._id }, CONFIG.SECRETKEY, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
}

export function refreshAccessToken() {
  try {
    return jwt.sign({}, CONFIG.SECRETKEY, {
      expiresIn: "14d",
    });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

export async function verifyAccessToken(token) {
  try {
    const user = jwt.verify(token, CONFIG.SECRETKEY);

    return {
      type: true,
      id: user.id,
    };
  } catch (error) {
    return {
      type: false,
      message: error.message,
    };
  }
}

export async function verifyRefreshToken(token, id, next) {
  try {
    const user = await User.findById(id);

    if (token === user.refreshToken) {
      try {
        jwt.verify(token, CONFIG.SECRETKEY);

        return true;
      } catch (error) {
        return false;
      }
    }

    return false;
  } catch (error) {
    error.message = errors.INTERNAL_SERVER_ERROR.message;
    error.status = errors.INTERNAL_SERVER_ERROR.status;

    next(error);
  }

  return null;
}
