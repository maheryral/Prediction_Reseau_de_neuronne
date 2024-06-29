const { app, BrowserWindow } = require('electron');
const path = require('path');


let mainWindow;




function createWindow() {
   mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true,
    }
  });
 
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, 'dist/help_desk/index.html'));
  mainWindow.webContents.openDevTools();
  // mainWindow.webContents.openDevTools();

  

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  

}


app.on('ready', () => {
  createWindow();
 
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
