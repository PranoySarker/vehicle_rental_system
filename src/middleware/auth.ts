import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).send({
          success: false,
          message: "You are not allowed",
        });
      }
      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;
      console.log(decoded);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).send({
          success: false,
          message: "unauthorized access",
        });
      }

      next();
    } catch (error) {
      res.status(401).send({
        success: false,
        message: "Invalid token",
        error: (error as Error).message,
      });
    }
  };
};

export default auth;
