const { app, BrowserWindow, Menu, ipcMain, TouchBar } = require('electron');
const { TouchBarButton, TouchBarSpacer } = TouchBar;

const isDev = require('electron-is-dev');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createMenu () {
	const template = [
		{
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
		}
	];

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

function createWindow () {
    // Create the browser window.
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

		// and load the index.html of the app.

		if (isDev) {
			console.log('\n\nℹ️  Running in dev mode...\n\n');
			win.loadURL('http://localhost:8080/');
		} else {
			win.loadFile('dist/index.html');
		}

		win.once('ready-to-show', () => {
	    win.show();
	  });

		// Emitted when the window is closed.
		win.on('closed', () => {
			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
  		win = null;
		});
}

function touchbar(event, args) {
	let buttons = [];

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createWindow();
	createMenu();
	bindEvents();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
