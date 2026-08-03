
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

function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const text = todoInput.value.trim();

    if (text !== "") {
        const list = document.getElementById("todoList");
        const li = document.createElement("li");

        li.innerHTML = `
        <span onclick="toggleTodo(this.parentElement)" style="cursor: pointer" >${text}</span>
        <button id="delete-btn" onclick="this.parentElement.remove(); saveTodos()">x</button>
        `;

        list.appendChild(li);
        todoInput.value = "";
        saveTodos();
    }
}

function saveTodos() {
    const list = document.getElementById('todoList');
    localStorage.setItem('myTodoList', list.innerHTML);
}

function loadTodos() {
    const list = document.getElementById('todoList');
    const savedData = localStorage.getItem('myTodoList');
    if (savedData) {
        list.innerHTML = savedData;
    }
}

loadTodos();

function toggleTodo(element) {
    element.classList.toggle('completed');
    saveTodos();
}

function updateTime() {
    const now = new Date();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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