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
            show: false
        });

        appWindow.loadFile('./src/index.html');

        appWindow.on('closed', function() {
            appWindow = null;
        });
    }

    app.whenReady().then(createWindow);

}