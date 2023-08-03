import type { NextApiRequest, NextApiResponse } from "next";
import { apiMiddleware } from "@/utils/apiMiddleware";
const Room = require("@/models/Room");

type Data = {
  name?: string;
  success?: boolean;
  status?: number;
  message?: string;
};

const updateRoomById_Public = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        await Room.updateOne(
          {
            "roomNumbers._id": req.query.id,
          },
          {
            $push: {
              "roomNumbers.$.unavaliableDates": req.body.dates,
            },
          },
        );
        res.status(200).json("Room status has been updated." as any);
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

export default apiMiddleware(updateRoomById_Public);
