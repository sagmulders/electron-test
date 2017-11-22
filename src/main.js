const electron = require('electron')

const countdown = require('./countdown')

const app = electron.app;
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

let mainWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        height: 800,
        width: 1000
    });

    mainWindow.loadURL(`file://${__dirname}/countdown.html`);

    mainWindow.on('closed', _ => {
        console.log('closed!');
        mainWindow=null;
    });
});

ipcMain.on('countdown-start', _ => {
    countdown(count => {
        console.log('count', count)
        mainWindow.webContents.send('countdown', count)
    })
})