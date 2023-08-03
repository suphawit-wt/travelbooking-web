import type { NextApiRequest, NextApiResponse } from 'next'
import { apiMiddleware } from '@/utils/apiMiddleware';
import { verifyToken } from '@/utils/verifyToken';
const UserModel = require("@/models/User");

type Data = {
    name?: string,
    success?: boolean,
    status?: number,
    message?: string
}

const apiUserById = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    const { method } = req
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const user = await UserModel.findById(id);
                res.status(200).json(user)
            } catch (err) {
                res.status(400).json({ success: false, status: 400, message: 'Failed to get a data' })
            }
            break
        case 'PUT':
            try {
                const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
                res.status(200).json(updatedUser)
            } catch (err) {
                res.status(400).json({ success: false, status: 400, message: 'Failed to update data' })
            }
            break
        case 'DELETE':
            try {
                await UserModel.findByIdAndDelete(id);
                res.status(200).json("User has been deleted" as any)
            } catch (err) {
                res.status(400).json({ success: false, status: 400, message: 'Failed to update data' })
            }
        default:
            res.status(405).json({ success: false, status: 405, message: 'Method Not Allowed' })
    }
}

export default apiMiddleware(verifyToken(apiUserById))