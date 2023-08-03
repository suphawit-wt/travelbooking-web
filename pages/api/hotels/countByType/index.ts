import type { NextApiRequest, NextApiResponse } from "next";
import { apiMiddleware } from "@/utils/apiMiddleware";
const Hotel = require("@/models/Hotel");

type Data = {
  name?: string;
  success?: boolean;
  status?: number;
  message?: string;
};

const getHotels_ByType_Public = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({
          type: "apartment",
        });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
          { type: "hotels", count: hotelCount },
          { type: "apartments", count: apartmentCount },
          { type: "resorts", count: resortCount },
          { type: "villas", count: villaCount },
          { type: "cabins", count: cabinCount },
        ] as any);
      } catch (err) {
        res.status(400).json({
          success: false,
          status: 400,
          message: "Failed to get data",
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

export default apiMiddleware(getHotels_ByType_Public);
