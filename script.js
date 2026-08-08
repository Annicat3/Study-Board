
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

function handleLocalImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageDataUrl = e.target.result;
        setImageBackground(imageDataUrl);
    };
    reader.readAsDataURL(file);
}

function setImageBackground(url) {
    const container = document.getElementById('bgContainer');
    if (container) {
        container.style.backgroundImage = `url('${url}')`;
        localStorage.setItem('customBgImage', url);
    }
}

function removeBg() {
    const container = document.getElementById('bgContainer');
    if (container) {
        container.style.backgroundImage = 'none';
        localStorage.removeItem('customBgImage');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedBg = localStorage.getItem('customBgImage');
    if (savedBg) {
        setImageBackground(savedBg);
    }
});

function applyYtBg() {
    const url = document.getElementById("ytInput").value.trim();
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (videoId) {
        setVideoBackground(videoId);
    }
}

function setVideoBackground(videoId) {
    const iframe = document.getElementById('bgVideo');
    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1`;
        localStorage.setItem('customYtVideoId', videoId);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedVideoId = localStorage.getItem('customYtVideoId');
    if (savedVideoId) setVideoBackground(savedVideoId);
})

function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const text = todoInput.value.trim();

    if (text !== "") {
        const list = document.getElementById("todoList");
        const li = document.createElement("li");

        li.innerHTML = `
        <div class="todo-left">
          <input type="checkbox" onchange="toggleTodo(this)" />
          <span>${text}</span>
        </div>
        <button onclick="this.parentElement.remove(); saveTodos()">x</button>
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

function toggleTodo(checkbox) {
    const li = checkbox.closest('li');
    if (checkbox.checked) {
        li.classList.add('completed');
        checkbox.setAttribute('checked', 'checked');
    } else {
        li.classList.remove('completed');
        checkbox.removeAttribute('checked');
    }
    saveTodos(); 
}

function saveNotes() {
    const notesText = document.getElementById("notesInput").value;
    localStorage.setItem("myNotes", notesText);
}

function loadNotes() {
    const savedNotes = localStorage.getItem("myNotes");
    if (savedNotes !== null) {
        document.getElementById("notesInput").value = savedNotes;
    }
}

loadNotes();

const notesInput = document.getElementById("notesInput");
if (notesInput) {
    notesInput.addEventListener("input", function() {
        this.style.height = "auto"; 
        this.style.height = this.scrollHeight + "px";
        saveNotes();
    });

    notesInput.addEventListener("touchmove", function(e) {
        e.stopPropagation();
    }, {passive: false});
}


let timerInterval = null;
let totalSeconds = 0;

function startTimer() {
    if (timerInterval !== null) return;
    const input = document.getElementById("timerInput");
    if (totalSeconds === 0 && input.value > 0) {
        totalSeconds = parseInt(input.value) * 60;
    }

    if (totalSeconds > 0){
        timerInterval = setInterval(updateTimerDisplay, 1000);
    }
}

function updateTimerDisplay() {
    if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        //document.getElementById('alarm').play().catch(() => {});
        alert("Time's up!")
        return;
    }
    totalSeconds--;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const displayString = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
    document.getElementById("timerDisplay").innerText = displayString;
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    totalSeconds = 0;
    document.getElementById("timerDisplay").innerText = "00:00";
    document.getElementById("timerInput").value = "";
}

function adjustVolume(audioId, sliderValue) {
    const audio = document.getElementById(audioId);
    if (!audio) return;
    
    const volume = parseFloat(sliderValue);
    audio.volume = volume;

    if (volume > 0) {
        audio.play().catch(() => {});
    }
    else {
        audio.pause();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        input.addEventListener('touchstart', (e) => {
            e.stopPropagation();
        });
        input.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        });
    });
});

async function loadNewCatAndQuote() {
    const catImg = document.getElementById('catImg');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');


    try {
        catImg.src = `https://cataas.com/cat?timestamp=${Date.now()}`
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        quoteText.innerText = `"${data.quote}"`;
        quoteAuthor.innerText = `- ${data.author}`;
    }   catch (error) {
        quoteText.innerText = "Couldn't load new content.";
        console.error("API Error:", error);
    }
}

function changeAccentColor(newColor) {
    document.documentElement.style.setProperty("--accent-color", newColor);
    localStorage.setItem("customAccentColor", newColor);

    const hex = newColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt (hex.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = (brightness > 200) ? '#000000' : '#ffffff' ;
    document.documentElement.style.setProperty('--text-color', textColor);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem("customAccentColor");
    if (savedColor) {
        changeAccentColor(savedColor);
    }
});

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