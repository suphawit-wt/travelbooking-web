import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyAdmin } from '@/utils/verifyAdmin';
import { apiMiddleware } from '@/utils/apiMiddleware';
const Hotel = require("@/models/Hotel");

type Data = {
  name?: string,
  success?: boolean,
  status?: number,
  message?: string
}

const getHotels_Private = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { method } = req

  switch (method) {
    case 'POST':
      const newHotel = new Hotel(req.body)
      try {
        const saveHotel = await newHotel.save()
        res.status(201).json(saveHotel)
      } catch (err) {
        res.status(400).json({ success: false, status: 400, message: 'Failed to insert new data' })
      }
      break
    default:
      res.status(405).json({ success: false, status: 405, message: 'Method Not Allowed' })
  }

}

export default apiMiddleware(verifyAdmin(getHotels_Private))