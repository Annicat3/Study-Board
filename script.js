
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