const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (envVars) => {
	const { env } = envVars;
	const envConfig = require(`./webpack.${env}.js`);
	const config = merge(commonConfig, envConfig);
	config.output = {
		...config.output,
		publicPath: '/', // Устанавливаем publicPath
	};
	return config;
};
