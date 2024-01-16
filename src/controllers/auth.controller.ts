import User from "../models/User";
import { generateAccessToken, refreshAccessToken } from "../service/jwt";
import errors from "../constants/errors";
import CONFIG from "../constants/config";
import { Error } from "../types/type";

export const check = async function (req, res, next) {
  if (!req.user) {
    const error: Error = new Error(errors.NOT_AUTHORIZED.message);
    error.status = errors.NOT_AUTHORIZED.status;

    return next(error);
  }

  const user = await User.findById(req.user);

  if (!user) {
    const error: Error = new Error("User not found");
    error.status = 404;
    return next(error);
  }

  const userInfo = {
    username: user.username,
    userId: req.user,
  };

  res.status(200).json({ success: true, userInfo });
};

export const login = async function (req, res, next) {
  let member;

  try {
    const { email, username } = req.body;

    member = await User.findOne({ email });

    if (!member) {
      member = await User.create({ email, username });
    }

    const accessToken = generateAccessToken(member);
    const refreshToken = refreshAccessToken();

    const user = await User.findByIdAndUpdate(member._id, { refreshToken });

    const userInfo = {
      username: user.username,
      userId: member._id,
    };

    res
      .status(201)
      .cookie("AccessToken", accessToken, {
        maxAge: CONFIG.ONE_HOUR_IN_MS,
        httpOnly: true,
      })
      .json({ success: true, userInfo });
  } catch (error) {
    error.message = errors.NOT_AUTHORIZED.message;
    error.status = errors.INTERNAL_SERVER_ERROR.status;

    next(error);
  }
};

export const logout = async function (req, res, next) {
  try {
    res.clearCookie("AccessToken", { httpOnly: true });
    res.json({ success: true });
  } catch (error) {
    error.message = errors.INTERNAL_SERVER_ERROR.message;
    error.status = errors.INTERNAL_SERVER_ERROR.status;

    next(error);
  }
};
