import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { format } from 'url'
import windowStateKeeper from 'electron-window-state'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import isDev from 'electron-is-dev'

import initNuxt, { url, pollServer } from './lib/initNuxt'

require('electron-debug')({showDevTools: true})
let win = null
let initialLoad = true

const newWin = async () => {
  if (isDev && initialLoad) {
    initNuxt(require('../../nuxt.config'))
    await installExtension(VUEJS_DEVTOOLS)
    initialLoad = false
  }
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  })

  win = new BrowserWindow({
    title: 'Phonix',
    show: false,
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height
  })

  mainWindowState.manage(win)

  win.on('ready-to-show', () => {
    win.show()
    win.focus()
  })

  if (isDev) return win.loadURL(url)

  win
    .loadURL(
      format({
        pathname: join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
    .on('closed', () => {
      win = null
    })

  if (isDev) pollServer()
}

app
  .on('ready', newWin)
  .on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  .on('activate', () => {
    console.log('Activating window')
    if (win === null) newWin()
  })
