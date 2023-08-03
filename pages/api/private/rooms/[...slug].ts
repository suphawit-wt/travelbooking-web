import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyAdmin } from '@/utils/verifyAdmin';
import { apiMiddleware } from '@/utils/apiMiddleware';
import { ParsedUrlQuery } from 'querystring';
const Hotel = require("@/models/Hotel");
const Room = require("@/models/Room");

type Data = {
  name?: string,
  success?: boolean,
  status?: number,
  message?: string
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

const getRoomsBySlug_Private = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { method } = req

  const { slug } = req.query as IParams

  switch (method) {
    case 'DELETE':
      try {
        await Room.findByIdAndDelete(slug[0]);

        try {
          await Hotel.findByIdAndUpdate(slug[1], {
            $pull: { rooms: slug[0] },
          })
        } catch (err) {
          res.status(400).json({ success: false, status: 400, message: 'Failed to insert new data' })
        }

        res.status(200).json("Room has been deleted" as any)
      } catch (err) {
        res.status(400).json({ success: false, status: 400, message: 'Failed to update data' })
      }
      break
    default:
      res.status(405).json({ success: false, status: 405, message: 'Method Not Allowed' })
  }

}

export default apiMiddleware(verifyAdmin(getRoomsBySlug_Private))