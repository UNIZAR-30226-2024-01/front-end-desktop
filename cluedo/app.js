const{
    app,
    BrowserWindow
    } = require('electron');   

    let appWindow;

    function createWindow(){
        appWindow = new BrowserWindow({
            width: 1200,
            height: 800,
            center: true,
        });

        appWindow.loadFile('./dist/cluedo/browser/index.html');

        appWindow.on('closed', function() {
            appWindow = null;
        });
    }

    app.whenReady().then(() => {
        createWindow()
    })