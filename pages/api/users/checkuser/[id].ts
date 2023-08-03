import type { NextApiRequest, NextApiResponse } from 'next'
import { apiMiddleware } from '@/utils/apiMiddleware';
import { verifyToken, verifyUser } from '@/utils/verifyToken';
const UserModel = require("@/models/User");

type Data = {
  name?: string,
  success?: boolean,
  status?: number,
  message?: string
}

const apiCheckUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        res.send("hello user, you are logged in and you can edit your account" as any)
      } catch (err) {
        res.status(400).json({ success: false, status: 400, message: 'Failed to check data' })
      }
      break
    default:
      res.status(405).json({ success: false, status: 405, message: 'Method Not Allowed' })
  }

}

export default apiMiddleware(verifyToken(apiCheckUser))