
function openApp(appId) {
    const selectedApp = document.getElementById(appId);
    if (selectedApp) {
        selectedApp.classList.add('active');
    }
}

function makeDraggable(element) {
    element.addEventListener('touchmove', function(e) {
        e.preventDefault();
        let touch = e.touches[0];
        element.style.left = (touch.clientX - 50) + 'px';
        element.style.top = (touch.clientY - 20) + 'px';
    }, {passive: false});
}
document.querySelectorAll('.app-window').forEach(window => {
    makeDraggable(window);
})


function closeApp(appId) {
    const selectedApp = document.getElementById(appId);
    if (selectedApp) {
        selectedApp.classList.remove('active');
    }
}

function updateTime() {
    const now = new Date();
    let weekday = String(now.getDay()).padStart(3, "0");
    let month = String(now.getMonth()).padStart(2, "0");
    let day = String(now.getDate()).padStart (2, "0");
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");

    const timeString = `${month}.${day}, ${hours}:${minutes}`;
    document.getElementById("time").textContent = timeString;
}

updateTime();
setInterval(updateTime, 1000);