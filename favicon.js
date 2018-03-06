const sharp = require('sharp')
const resolve = require('path').resolve
const toIco = require('to-ico')
const fs = require('fs-extra')
const crypto = require('crypto')

module.exports = async function Favicon(moduleOptions) {
	let cached = false
	const defaults = {
		input: '~/static/icon.png', //add options? trim?
		generate: [
			{ path: 'test.png', operations: ['flip'] }
		],
		color: '#ff0000'
	}
	const options = Object.assign({}, defaults, this.options.favicon, moduleOptions)
	let input = options.input.replace(/^[~@]/, this.options.srcDir)
	input = input.replace(/^(~~|@@)/, this.options.rootDir)
	const density = input.endsWith('.svg') ? { density: 1200 } : {}
	const source = sharp(input, density).background(options.color).flatten()

	const outputPath = resolve(this.options.srcDir, 'static')
	const cachePath = resolve(this.options.rootDir, this.options.tmpDir, 'favicon.json')
	const inputHash = hash(input)
	try {
		const fileCache = await fs.readFile(cachePath, 'utf8')
		if (JSON.stringify({hash: inputHash, options: options}) === fileCache) {
			cached = true
		}
	} catch (e) {}

	let outputs = []
	for (const output of options.generate) {
		let path = resolve(outputPath, output.path)
		if (cached && await fs.pathExists(path)) {
			continue
		}

		const clone = source.clone()
		if (output.operations && output.operations.length){
			for (const op of output.operations) {
				if (typeof op === 'string') {
					clone[op]()
				} else {
					clone[op.name](...op.args)
				}
			}
		} else if (output.size && output.size.length) {
			clone.resize(...output.size).max().embed()
		} else if (output.sizes && output.sizes.length) {
			/*
			let promises = []
			for (const size of output.sizes) {
				promises.push(clone.clone()
					.resize(size,size)
					.max()
					.embed()
					.toBuffer()
					.then(data => data))
			}
			outputs.push(Promise.all(promises).then(buffers =>{
				toIco(buffers).then(async buf => {
					return fs.outputFile(resolve(outputPath, output.path), buf)
				})
			}))
			*/
			continue
		}
		outputs.push(clone.toFile(resolve(outputPath, output.path)))
	}
	outputs.push(fs.outputFile(cachePath, JSON.stringify({hash: inputHash, options: options})))
	await Promise.all(outputs)
}


async function hash(filename) {
	let contents = await fs.readFile(filename)
	return crypto.createHash('md5').update(contents).digest('hex')
}
