const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (envVars = {}) => {
	const { env = 'dev' } = envVars;
	const envConfig = require(`./webpack.${env}.js`);
	const config = merge(commonConfig, envConfig);
	config.output = {
		...config.output,
		path: `${__dirname}/../build`,
		publicPath: '/',
	};
	return config;
};
