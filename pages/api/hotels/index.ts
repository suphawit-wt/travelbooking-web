import type { NextApiRequest, NextApiResponse } from "next";
import { apiMiddleware } from "@/utils/apiMiddleware";
const Hotel = require("@/models/Hotel");

type Data = {
  name?: string;
  success?: boolean;
  status?: number;
  message?: string;
};

const getHotels_Public = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const { min, max, ...others } = req.query;

      try {
        const hotels = await Hotel.find({
          ...others,
          cheapestPrice: { $gte: min || 1, $lte: max || 999 },
        }).limit(req.query.limit);
        res.status(200).json(hotels);
      } catch (err) {
        res.status(400).json({
          success: false,
          status: 400,
          message: "Failed to get all data",
        });
      }
      break;
    default:
      res.status(405).json({
        success: false,
        status: 405,
        message: "Method Not Allowed",
      });
  }
};

export default apiMiddleware(getHotels_Public);
