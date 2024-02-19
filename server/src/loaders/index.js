import expressLoader from './express-loader.js';
import mongodbLoader from './mongodb-loader.js';

export function init(server, config){
    expressLoader(server);
    mongodbLoader(config.database);
}
