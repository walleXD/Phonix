module.exports = {
  srcDir: './src/client',
  buildDir: './dist/client',
  generate: {
    dir: './dist/renderer'
  },
  router: {
    mode: 'hash'
  },
  build: {
    extend (config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.target = 'electron-renderer'
      }
      config.output.publicPath='_nuxt/'
    }
  }
}
