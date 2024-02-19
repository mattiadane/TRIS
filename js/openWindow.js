const { ipcRenderer } = require("electron");

document.querySelector(".button")
    .addEventListener("click",() => {
        openWindow()

})
 
function openWindow() {
    ipcRenderer.send("secondWindow","request a new window");
}

