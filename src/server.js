import logger from './util/logger.js';
import { createApp } from './app.js';

(async () => {
    try {
        const app = await createApp();
        app.listen(app.get('port'), () => {
            logger.info(`Server listening on port ${app.get('port')}`);
        });
    } catch (err) {
        logger.error(err, 'error caught in server.js');
    }
})();
