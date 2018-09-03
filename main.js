const { app, BrowserWindow, Menu } = require('electron');
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

app.on('ready', () => {
    createWindow();
    createMenu();
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
