const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function newWindow (url,w,h) {
  const win = new BrowserWindow({
    width: w,
    height: h,
    icon : path.join(__dirname,"../icons/tris.png"),
    webPreferences: {
    enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.removeMenu()
  win.loadFile(url)
}

app.whenReady().then(() => {
  newWindow("index.html",1000,1000)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      newWindow("index.html",1000,1000)
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on("secondWindow",(event,data) =>{
  newWindow("html/gioco.html",1000,1000);
})






