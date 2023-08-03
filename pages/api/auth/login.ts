import type { NextApiRequest, NextApiResponse } from 'next'
import { apiMiddleware } from '@/utils/apiMiddleware';
const User = require("@/models/User");
var bcrypt = require('bcryptjs');
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';

type Data = {
    name?: string,
    success?: boolean,
    status?: number,
    message?: string,
    details?: any,
    isAdmin?: any
}

export type NextApiResponseWithCookie = NextApiResponse<Data> & {
    cookie: any
  }

const login = async (
    req: NextApiRequest,
    res: NextApiResponseWithCookie
) => {
    const { method } = req

    switch (method) {
        case 'POST':
            try {
                const user = await User.findOne({ username: req.body.username })

                if (!user) {
                    res.status(404).send("User not found." as any)
                }

                const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
                if (!isPasswordCorrect) {
                    res.status(400).send("Wrong password or username!" as any)
                }

                const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET!)

                const { password, isAdmin, ...otherDetails } = user._doc

                res.setHeader('Set-Cookie', serialize('access_token', token, { httpOnly: true, path: '/', domain: 'localhost' })).status(200).json({ details: {...otherDetails}, isAdmin })
            } catch (err) {
                res.status(400).json({ success: false, status: 400, message: 'Failed to login' })
            }
            break
        default:
            res.status(405).json({ success: false, status: 405, message: 'Method Not Allowed' })
    }

}

export default apiMiddleware(login)