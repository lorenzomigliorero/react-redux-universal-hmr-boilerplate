export default ({ outputPath = '' }) => ({
	loader: 'file-loader',
	options: {
		
		name: process.env.NODE_ENV === 'development' || process.env.static ? '[name].[ext]' : '[name].[hash:5].[ext]',
		outputPath,
		emitFile: !process.env.SSR
	
	}
});