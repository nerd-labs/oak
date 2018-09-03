const { app, BrowserWindow, Menu, ipcMain, TouchBar } = require('electron');
const { TouchBarButton, TouchBarSpacer } = TouchBar;
const isDev = require('electron-is-dev');

let win;

function createWindow () {
    win = new BrowserWindow({
        frame: false,
        show: false,
        title: 'Oak',
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/public/preload.js'
        }
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

function createMenu () {
    const template = [{
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            {role: 'selectall'},
        ]
    },
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {role: 'toggledevtools'},
            {type: 'separator'},
            {role: 'togglefullscreen'},
        ]
    },
    {
        label: 'Window',
        submenu: [
            {role: 'minimize'},
            {type: 'separator'},
            {role: 'close'},
            {type: 'separator'},
            {
                label: 'Go to home',
                accelerator: 'CommandOrControl+Shift+H',
                click: (menuItem, browserWindow) => {
                    browserWindow.webContents.send('home')
                }
            },
        ]
    }];

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                {role: 'about'},
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideothers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

function touchbar(event, args) {
    const random = new TouchBarButton({
        label: `show random pokemon`,
        click: () => {
            const random = Math.floor(Math.random() * args.number) + 1
            event.sender.send('touchbar', random);
        }
    });

    let touchBar = new TouchBar([
        new TouchBarSpacer({ size: 'flexible' }),
        random,
        new TouchBarSpacer({ size: 'flexible' }),
    ]);

    win.setTouchBar(touchBar);
}

function bindEvents() {
    ipcMain.on('touchbar', (event, args) => {
        touchbar(event, args);
    });
}

app.on('ready', () => {
    createWindow();
    createMenu();

    bindEvents();
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
