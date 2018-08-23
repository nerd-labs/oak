const { app, BrowserWindow } = require('electron');

let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
			title: 'Oak',
		});

		win.maximize();

		// and load the index.html of the app.
		win.loadFile('dist/index.html')

		win.once('ready-to-show', () => {
	    win.show()
	  });

		// Emitted when the window is closed.
		win.on('closed', () => {
			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
  		win = null;
		});
}

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
