import http from 'http'
import { Nuxt, Builder } from 'nuxt'
import { app, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'

let win = null
// Current window
let config = require('../../nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')
// config.rootDir = __dirname
const nuxt = new Nuxt(config)
const server = http.createServer(nuxt.render)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch(error => {
    console.error(error)
    // eslint-disable-line no-console
    process.exit(1)
  })
}

server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
console.log(`Nuxt working on ${_NUXT_URL_}`)

const POLL_INTERVAL = 300
const pollServer = () => {
  http.get(_NUXT_URL_, res => {
    const SERVER_DOWN = res.statusCode !== 200
    SERVER_DOWN
      ? setTimeout(pollServer, POLL_INTERVAL)
      : win.loadURL(_NUXT_URL_)
  }).on('error', pollServer)
}

const newWin = () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  if (!config.dev) {
    return win.loadURL(_NUXT_URL_)
  }
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )
  win.on('closed', () => win = null)
  pollServer()
}

app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
