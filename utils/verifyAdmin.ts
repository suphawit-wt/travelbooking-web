import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface apiRequest extends NextApiRequest {
  user: any;
}

export const verifyAdmin =
  (handler: any) => async (req: apiRequest, res: NextApiResponse) => {
    const token = req.cookies.access_token;
    if (!token) {
      res.status(401).json({ message: "You are not authenticated!" });
    }

    jwt.verify(token as string, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Token is not valid!" });
      }
      req.user = user;
    });

    verifyAdminRole(req, res);

    await handler(req, res);
  };

export const verifyAdminRole = (req: apiRequest, res: NextApiResponse) => {
  if (req.user.isAdmin) {
  } else {
    res.status(403).json({ message: "You are not authorized!" });
  }
};
