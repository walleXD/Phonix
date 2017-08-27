import { app, BrowserWindow } from 'electron'
import path, { resolve } from 'path'
import { format } from 'url'

import initNuxt, { url, pollServer } from './lib/initNuxt'

let win = null

const isDev = process.env.NODE_ENV !== 'production'
if (isDev) initNuxt(require('../../nuxt.config'))

const newWin = () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.openDevTools()
  if (isDev) {
    return win.loadURL(url)
  }
  win.loadURL(
    format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )
  win.on('closed', () => win = null)
  if (isDev) pollServer()
}

app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
