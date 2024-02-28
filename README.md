# front-end-desktop

* 1) cd until directory "cluedo"

On Windows client computers, the execution of PowerShell scripts is disabled by default. To allow the execution of PowerShell scripts, which is needed for npm global binaries, you must set the following execution policy:

* 2) Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

Carefully read the message displayed after executing the command and follow the instructions. Make sure you understand the implications of setting an execution policy.

* 3) npm install -g @angular/cli


## APP.EXE
* 4) npm install -g electron
* 5) npm install -g electron-packager
* 6) electron-packager ./ cluedo --platform=win32 --overwrite
---------------------------------------------------------------

## BROWSER
* 4) ng version (optional to verify it is working correctly)
* 5) ng serve (--open to open in browser)
