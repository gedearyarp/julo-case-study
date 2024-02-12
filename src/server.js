import Logger from 'js-logger';
import { createApp } from './app.js';

(async () => {
    try {
        const app = await createApp();
        app.listen(app.get('port'), () => {
            Logger.info(
                {
                    port_number: app.get('port'),
                    env_string: app.get('env'),
                },
                'Started express server',
            );
        });
    } catch (err) {
        Logger.error(err, 'error caught in server.ts');
    }
})();
