const path = require('path');
const {
  dependencies: deps,
} = require('./package.json');

const ID_DEV_MODE = process.env.NODE_ENV === 'developement';
const ID_APP_ENV_PRODUCTION = process.env.APP_ENV === 'production';

module.exports = {
  webpack5: true,
  env: {
    DEV_MODE: ID_DEV_MODE,
    APP_ENV: process.env.APP_ENV,
    APP_ENV_PRODUCTION: ID_APP_ENV_PRODUCTION,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        '@svgr/webpack',
        'url-loader',
      ],
    });
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'stylues')],
    prependData: `
      @import "mixin.scss";
      $DEV_MODE : ${process.env.NODE_ENV === 'developement'};
    `,
  },
  reactStrictMode: true,
};
