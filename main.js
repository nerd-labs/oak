const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let win;

function createWindow () {
    win = new BrowserWindow({
        show: false,
        title: 'Oak',
    });

    win.maximize();

    if (isDev) {
        console.log('\n\nℹ️  Running in dev mode...\n\n');
        win.loadURL('http://localhost:8080/');
    } else {
        win.loadFile('dist/index.html');
    }

    win.once('ready-to-show', () => {
        win.show();
    });

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', () => {
	createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})
