const HTMLWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
// to convert a relative path to an absolute one, we will use the path package
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production';

module.exports = {
	entry: path.resolve(__dirname, '..', './src/index.tsx'),
	// the entry point to our application contains the absolute path to index.ts
	output: {
		// the path where our project will be built
		path: path.resolve(__dirname, '..', './dist'),
		filename: production
			? 'static/scripts/[name].[contenthash].js'
			: 'static/scripts/[name].js', // the name of our bundle
	},
	// We need to help webpack work with jsx and tsx files, for this we use ts-loader
	module: {
		rules: [
			{
				// contains a regular expression that specifies
				test: /\.[tj]sx?$/,
				// which files should be processed by this loader?
				use: [
					{
						loader: 'ts-loader',
					},
				],
				/* For ts-loader to work correctly, we need a tsconfig; it can be created manually or
				automatically. To initialize it automatically, you can install TypeScript globally
				or use npx by running npx tsc --init. After creating the config, enable "allowJs": true
				to work not only with TypeScript, also change "jsx": "react" so we can work with React components,
				and enable "sourceMap": true. That's all for now, we'll return to this config later */
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|gif|webp)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/images/[hash][ext][query]',
				},
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/fonts/[hash][ext][query]',
				},
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ['@svgr/webpack', 'url-loader'],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					production ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[name]__[local]__[hash:base64:5]',
								auto: /\.module\.\w+$/i,
							},
							// Value 2 means that some PostCSS transformations should be applied before css-loader.
							importLoaders: 2,
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							api: 'modern',
						},
					},
				],
			},
		],
	},
	resolve: {
		// specify the file extensions webpack will work with
		extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
		alias: {
			'@components': path.resolve(__dirname, '..', './src/components'),
			'@hooks': path.resolve(__dirname, '..', './src/hooks'),
			'@interfaces': path.resolve(__dirname, '..', './src/interfaces'),
			'@pages': path.resolve(__dirname, '..', './src/pages'),
			'@services': path.resolve(__dirname, '..', './src/services'),
			'@styles': path.resolve(__dirname, '..', './src/styles'),
			'@utils': path.resolve(__dirname, '..', './src/utils'),
		},
	},
	plugins: [
		new HTMLWebpackPlugins({
			template: path.resolve(__dirname, '..', './public/index.html'),
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: production
				? 'static/styles/[name].[contenthash].css'
				: 'static/styles/[name].css',
		}),
		new webpack.EnvironmentPlugin({
			// the default value is 'development' if process.env.NODE_ENV is not set
			NODE_ENV: 'development',
		}),
	],
};
