import type { NextApiRequest, NextApiResponse } from "next";
import { apiMiddleware } from "@/utils/apiMiddleware";
const Room = require("@/models/Room");
const Hotel = require("@/models/Hotel");

type Data = {
  name?: string;
  success?: boolean;
  status?: number;
  message?: string;
};

const getRoomByHotelId_Public = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const hotel = await Hotel.findById(id);
        const list = await Promise.all(hotel.rooms.map((room: any) => {
          return Room.findById(room);
        }));
        res.status(200).json(list as any);
      } catch (err) {
        res.status(400).json({
          success: false,
          status: 400,
          message: "Failed to get a data",
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

export default apiMiddleware(getRoomByHotelId_Public);
