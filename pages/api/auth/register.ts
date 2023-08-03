import type { NextApiRequest, NextApiResponse } from 'next'
import { apiMiddleware } from '@/utils/apiMiddleware';
const User = require("@/models/User");
var bcrypt = require('bcryptjs');

type Data = {
  name?: string,
  success?: boolean,
  status?: number,
  message?: string
}

const register = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(req.body.password, salt);

       const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
       })

       await newUser.save()
       res.status(201).send("User has been created." as any)
      } catch (err) {
        res.status(400).json({ success: false, status: 400, message: 'Failed to create new user' })
      }
      break
    default:
      res.status(405).json({ success: false, status: 405, message: 'Method Not Allowed' })
  }

}

export default apiMiddleware(register)