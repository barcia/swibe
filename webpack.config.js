module.exports = {
	entry: './src/swibe.js',
	output: {
		path: __dirname + '/dist',
		filename: 'swibe.min.js',
		library: 'Swibe',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	devtool: 'inline-source-map',
	devServer: {
    contentBase: './docs/demo',
		port: 8080,
		open: 'firefox developer edition',
		compress: false,
		watchContentBase: true,
		host: '0.0.0.0'
  },
	module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: "babel-loader"
				}
			]
		}
};
