import { verifyToken } from '../util/jwt.js';
import StandardError from '../util/standard-error.js';
import Wallet from '../domain/wallet.js';

export default async function validateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Token ')) {
        return res.status(401).json({
            status: 'fail',
            data: {
                error: 'Unauthorized',
            },
        });
    }

    const parsedToken = token.split(' ')[1];
    const decoded = verifyToken(parsedToken);
    if (!decoded) {
        return res.status(401).json({
            status: 'fail',
            data: {
                error: 'Unauthorized',
            },
        });
    }

    const wallet = await Wallet.findOne({ owned_by: decoded.customer_xid });
    if (!wallet) {
        return res.status(401).json({
            status: 'fail',
            data: {
                error: 'Unauthorized',
            },
        });
    }

    req.decoded = {
        customerXid: decoded.customer_xid,
    };

    return next();
}
