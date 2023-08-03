import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyAdmin } from '@/utils/verifyAdmin';
import { apiMiddleware } from '@/utils/apiMiddleware';
const Hotel = require("@/models/Hotel");
const Room = require("@/models/Room");

type Data = {
  name?: string,
  success?: boolean,
  status?: number,
  message?: string
}

const getRoomsById_Private = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { method } = req

  switch (method) {
    case 'POST':

      const hotelId = req.query.id
      const newRoom = new Room(req.body)

      try {
        const savedRoom = await newRoom.save()

        try {
          await Hotel.findByIdAndUpdate(hotelId, {
            $push: { rooms: savedRoom._id },
          })
        } catch (err) {
          res.status(400).json({ success: false, status: 400, message: 'Failed to insert new data' })
        }

        res.status(200).json(savedRoom)

      } catch (err) {
        res.status(400).json({ success: false, status: 400, message: 'Failed to insert new data' })
      }
      break
    case 'PUT':
      try {
        const updatedRoom = await Room.findByIdAndUpdate(req.query.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRoom)
      } catch (err) {
        res.status(400).json({ success: false, status: 400, message: 'Failed to update data' })
      }
      break
    default:
      res.status(405).json({ success: false, status: 405, message: 'Method Not Allowed' })
  }

}

export default apiMiddleware(verifyAdmin(getRoomsById_Private))