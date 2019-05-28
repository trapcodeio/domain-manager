require('dotenv').config();
const edge = require('express-edge');

module.exports = {
    name: 'DomainManager',
    env: 'development',
    debug: {
        enabled: true
    },
    database: {
        // Start Database on boot!
        startOnBoot: true,
        // Config is for knex database connection
        config: {
            client: process.env.DATABASE_CLIENT,
            connection: {
                filename: process.env.DATABASE_FILE
            },
            migrations: {
                tableName: 'migrations'
            },
            useNullAsDefault: true
        }
    },
    server: {
        port: process.env.APP_PORT,
        protocol: 'http',
        domain: process.env.APP_DOMAIN,
        root: '/',
        includePortInUrl: true,
    },
    paths: {
        base: __dirname,
        backend: 'backend',
        frontend: 'frontend',
        public: 'public',
    },
    session: {
        cookie: {
            path: '/',
            domain: process.env.APP_DOMAIN,
            maxAge: 5000 * 60 * 24,
        },
    },
    response: {
        cacheFiles: true,
    },

    auth: {
        afterLoginRoute: 'dashboard',
        usingEjs: false,
        views: {
            index: 'index',
            dashboard: 'dashboard'
        }
    },

    template: {
        use: edge,
        extension: 'edge'
    },
};