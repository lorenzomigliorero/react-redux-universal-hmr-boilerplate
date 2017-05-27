export default ({ outputPath = '' }) => ({
	loader: 'file-loader',
	options: {
		
		name: process.env.NODE_ENV === 'development' || process.env.static ? '[name].[ext]' : '[name].[hash:8].[ext]',
		outputPath: outputPath,
		emitFile: process.env.BABEL_ENV !== 'node'
	
	}
});