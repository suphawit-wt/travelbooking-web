import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";

export const apiMiddleware =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await dbConnect();
      console.log("i'm in middleware");

      await handler(req, res);
    } catch (err) {
      console.log(err);
    }
  };
