const env = process.env.NODE_ENV;

const { default: config } = require('./' + env);

export default config;
