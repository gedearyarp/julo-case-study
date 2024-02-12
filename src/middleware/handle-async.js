export default function handleAsync(func) {
    return async (req, res) => {
        try {
            return await func(req, res);
        } catch (err) {
            if (err.status) {
                return res.status(err.status).json({
                    status: 'fail',
                    data: {
                        error: err.message,
                    },
                });
            }

            return res.status(500).json({
                status: 'error',
                data: {
                    error: 'Internal server error',
                },
            });
        }
    };
}
