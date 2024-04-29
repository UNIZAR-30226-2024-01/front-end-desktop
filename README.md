# front-end-desktop

* 1) cd until directory "cluedo"

On Windows client computers, the execution of PowerShell scripts is disabled by default. To allow the execution of PowerShell scripts, which is needed for npm global binaries, you must set the following execution policy:

* 2) Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

Carefully read the message displayed after executing the command and follow the instructions. Make sure you understand the implications of setting an execution policy.

* 3) npm install -g @angular/cli
* 4) npm install

Those are the steps to install the Angular CLI and the project dependencies. The next steps depend on the target platform:

## APP.EXE
* 5) "npm run electron-build" to build the project for the desktop platform
---------------------------------------------------------------

## BROWSER
* 5) "ng version" (optional to verify it is working correctly)
* 6) "npm run dev" (or "ng serve") to open the project in the browser in development mode
