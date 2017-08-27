module.exports = {
  srcDir: './src/client',
  buildDir: './dist/client',
  generate: {
    dir: './dist/renderer',
    routes: ['/']
  },
  build: {
    extend (config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.target = 'electron-renderer'
      }
    }
  }
}
