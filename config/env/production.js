/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
    connections: {
        mongo_local: {
            adapter: 'sails-mongo',
            host: 'ds033143.mlab.com',
            port: 33143,
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
            database: 'booktrader'
        }
    },
    models: {
        connection: 'mongolabServer'
    },
    log: {
         level: "silent"
    }
};
