import type { NextApiRequest, NextApiResponse } from 'next'
import { apiMiddleware } from '@/utils/apiMiddleware';
import { verifyAdmin } from '@/utils/verifyAdmin';
const Hotel = require("@/models/Hotel");

type Data = {
    name?: string,
    success?: boolean,
    status?: number,
    message?: string
}

const getHotelById_Private = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    const { method } = req
    const { id } = req.query;

    switch (method) {
        case 'PUT':
            try {
                const updatedHotel = await Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
                res.status(200).json(updatedHotel)
            } catch (err) {
                res.status(400).json({ success: false, status: 400, message: 'Failed to update data' })
            }
            break
        case 'DELETE':
            try {
                await Hotel.findByIdAndDelete(id);
                res.status(200).json("Hotel has been deleted" as any)
            } catch (err) {
                res.status(400).json({ success: false, status: 400, message: 'Failed to update data' })
            }
            break
        default:
            res.status(405).json({ success: false, status: 405, message: 'Method Not Allowed' })
    }
}

export default apiMiddleware(verifyAdmin(getHotelById_Private))