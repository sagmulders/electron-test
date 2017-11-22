const electron = require('electron')

const countdown = require('./countdown')

const app = electron.app;
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const Menu = electron.Menu

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

    const name = electron.app.getName()
    const template = [
        {
            label: name,
            submenu: [{label: `About ${name}`}]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

ipcMain.on('countdown-start', _ => {
    countdown(count => {
        console.log('count', count)
        mainWindow.webContents.send('countdown', count)
    })
})