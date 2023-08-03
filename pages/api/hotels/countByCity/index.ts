import type { NextApiRequest, NextApiResponse } from "next";
import { apiMiddleware } from "@/utils/apiMiddleware";
const Hotel = require("@/models/Hotel");

type Data = {
  name?: string;
  success?: boolean;
  status?: number;
  message?: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    cities: string
  }
}

const getHotels_ByCity_Public = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const cities = req.query.cities.toString().split(",");

      try {
        const list = await Promise.all(cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        }));

        res.status(200).json(list as any);
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

export default apiMiddleware(getHotels_ByCity_Public);
