import jwt from "jsonwebtoken";

import createError from "http-errors";
import errors from "../constants/errors";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../service/jwt";

import User from "../models/User";
import CONFIG from "../constants/config";

export async function verifyToken(req, res, next): Promise<void> {
  try {
    const { AccessToken } = req.cookies;

    if (AccessToken) {
      const authResult = await verifyAccessToken(AccessToken);
      const decodedToken = jwt.decode(AccessToken);

      const user = await User.findById(decodedToken.id).lean();

      const refreshResult = await verifyRefreshToken(
        user.refreshToken,
        decodedToken.id,
        next,
      );

      if (!authResult.type && authResult.message === "jwt expired") {
        if (!refreshResult) {
          return next(createError(401, errors.NOT_AUTHORIZED.message));
        }

        const newAccessToken = generateAccessToken(decodedToken.id);

        res.status(201).cookie("AccessToken", newAccessToken, {
          maxAge: CONFIG.ONE_HOUR_IN_MS,
          httpOnly: true,
        });

        return next();
      }

      req.user = decodedToken.id;
      return next();
    }

    return next(createError(401, errors.NOT_AUTHORIZED.message));
  } catch (error) {
    error.message = errors.NOT_AUTHORIZED.message;
    error.status = errors.NOT_AUTHORIZED.status;

    return next(error);
  }
}
