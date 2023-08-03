import type { NextApiRequest, NextApiResponse } from 'next'
import { apiMiddleware } from '@/utils/apiMiddleware';
const Hotel = require("@/models/Hotel");

type Data = {
    name?: string,
    success?: boolean,
    status?: number,
    message?: string
}

const getHotelById_Public = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    const { method } = req
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const hotel = await Hotel.findById(id);
                res.status(200).json(hotel)
            } catch (err) {
                res.status(400).json({ success: false, status: 400, message: 'Failed to get a data' })
            }
            break
        default:
            res.status(405).json({ success: false, status: 405, message: 'Method Not Allowed' })
    }
}

export default apiMiddleware(getHotelById_Public)