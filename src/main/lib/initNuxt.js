import http from 'http'
import { Nuxt, Builder } from 'nuxt'

const defaultConfig = {
  build: {
    extend (config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.target = 'electron-renderer'
      }
    }
  }
}
export let url = null

export default (config = defaultConfig, port = 8080) => {
  const nuxt = new Nuxt(config)
  const server = http.createServer(nuxt.render)
  config.dev = !(process.env.NODE_ENV === 'production')

  if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build().catch(error => {
      console.error(error)
      // eslint-disable-line no-console
      process.exit(1)
    })
  }

  server.listen(port)
  url = `http://localhost:${port}`
  console.log(`Nuxt working on ${url}`)
}

export const pollServer = (POLL_INTERVAL = 300) => {
  http.get(url, res => {
    const SERVER_DOWN = res.statusCode !== 200
    SERVER_DOWN
      ? setTimeout(pollServer, POLL_INTERVAL)
      : win.loadURL(url)
  }).on('error', pollServer)
}
