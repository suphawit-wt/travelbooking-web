import type { NextApiRequest, NextApiResponse } from 'next'
import { apiMiddleware } from '@/utils/apiMiddleware';
const Room = require("@/models/Room");

type Data = {
  name?: string,
  success?: boolean,
  status?: number,
  message?: string
}

const getRooms_Public = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        console.log("i'm in get all api")
        const rooms = await Room.find();
        res.status(200).json(rooms)
      } catch (err) {
        res.status(400).json({ success: false, status: 400, message: 'Failed to get all data' })
      }
      break
    default:
      res.status(405).json({ success: false, status: 405, message: 'Method Not Allowed' })
  }

}

export default apiMiddleware(getRooms_Public)