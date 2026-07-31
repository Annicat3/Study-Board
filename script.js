
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
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let weekday = String(now.getDay()).padStart(1, "0");
    const weekdayName = weekdays[weekday];
    let month = String(now.getMonth()).padStart(2, "0");
    let day = String(now.getDate()).padStart (2, "0");
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");

    const dateString = `${weekdayName}, ${month}/${day}`;
    const timeString = `${hours}:${minutes}`;
    document.getElementById("time").textContent = timeString;
    document.getElementById("date").textContent = dateString;
}

updateTime();
setInterval(updateTime, 1000);