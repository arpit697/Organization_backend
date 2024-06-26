import { connect, set, ConnectOptions, connection } from 'mongoose';
import { createNewLogger } from '../utils/logger';

const mongoLogger = createNewLogger('mongodb');
const config = require('config');
class MongoDAO {
    async connect(): Promise<void> {
        set('debug', true);
        const { uri, dbName } = config.mongo;
        const options: ConnectOptions = {};
        if (!config.isLocal) {
            options.dbName = dbName;
        }
        mongoLogger.info(`Connecting MongoDB with URI "${uri}"`);
        await connect(uri, options);
        // await new Promise(connection.once.bind(connection, 'open'));
        mongoLogger.info('MongoDB connected successfully');
    }
    async close(): Promise<void> {
        // boolean means [force], see in mongoose doc
        return connection.close(false);
    }
}

export const mongoDAO = new MongoDAO();
