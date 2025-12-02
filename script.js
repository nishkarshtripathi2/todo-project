// Load saved todos on page load
window.addEventListener("DOMContentLoaded", loadTodos);

let priority = "low";
document.getElementById("prioSelect").addEventListener("change", e => {
    priority = e.target.value;
});

// Creates a new todo item
function newElement() {
    const input = document.getElementById("myInput");
    const text = input.value.trim();
    if (!text) return alert("Please enter something!");

    const li = createTodoItem(text, false, priority, new Date().toLocaleString());
    document.getElementById("myUL").appendChild(li);

    input.value = "";
    saveTodos();
}

function createTodoItem(text, checked = false, priority = "low", time = "") {
    const li = document.createElement("li");
    if (checked) li.classList.add("checked");
    li.classList.add(priority);

    // text span
    const t = document.createElement("span");
    t.textContent = text;

    // timestamp
    const ts = document.createElement("span");
    ts.className = "ts";
    ts.textContent = time;

    // delete button
    const del = document.createElement("span");
    del.className = "close";
    del.textContent = "×";
    del.onclick = e => {
        e.stopPropagation();
        li.remove();
        saveTodos();
    };

    // toggle completed
    li.onclick = e => {
        if (e.target === del) return;
        li.classList.toggle("checked");
        saveTodos();
    };

    // double click edit
    li.ondblclick = e => {
        const newText = prompt("Edit task:", t.textContent);
        if (newText !== null) {
            t.textContent = newText.trim();
            saveTodos();
        }
    };

    li.appendChild(t);
    li.appendChild(ts);
    li.appendChild(del);
    return li;
}

// Remove all items
function removeAll() {
    if (!confirm("Clear all tasks?")) return;
    document.getElementById("myUL").innerHTML = "";
    saveTodos();
}

// Remove completed tasks only
function clearDone() {
    document.querySelectorAll("li.checked").forEach(li => li.remove());
    saveTodos();
}

// Filtering
function filter(type) {
    document.querySelectorAll("#myUL li").forEach(li => {
        if (type === "all") li.style.display = "flex";
        else if (type === "completed") li.style.display = li.classList.contains("checked") ? "flex" : "none";
        else if (type === "pending") li.style.display = !li.classList.contains("checked") ? "flex" : "none";
    });
}

// Save to localStorage
function saveTodos() {
    const data = [];
    document.querySelectorAll("#myUL li").forEach(li => {
        data.push({
            text: li.querySelector("span").textContent,
            checked: li.classList.contains("checked"),
            priority: li.classList.contains("high") ? "high" :
                      li.classList.contains("medium") ? "medium" :
                      "low",
            time: li.querySelector(".ts").textContent
        });
    });
    localStorage.setItem("todos_v2", JSON.stringify(data));
}

// Load from localStorage
function loadTodos() {
    const data = JSON.parse(localStorage.getItem("todos_v2") || "[]");
    const ul = document.getElementById("myUL");
    ul.innerHTML = "";
    data.forEach(item => {
        ul.appendChild(createTodoItem(item.text, item.checked, item.priority, item.time));
    });
}
